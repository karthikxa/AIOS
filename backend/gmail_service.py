"""
Gmail Service — Real Gmail API integration for zed agents.

When a user connects Gmail via OAuth, this service stores the access token
and provides methods to send emails through the Gmail API.
"""

import json
import os
import base64
from email.mime.text import MIMEText
from pathlib import Path
from typing import Optional, Dict, Any

try:
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
    HAS_GOOGLE_API = True
except ImportError:
    HAS_GOOGLE_API = False


class GmailService:
    """Manages Gmail API connections and email sending."""

    def __init__(self, storage_dir: str = None):
        self.storage_dir = Path(storage_dir or os.path.expanduser("~/.zed/plugins/gmail"))
        self.storage_dir.mkdir(parents=True, exist_ok=True)
        self.tokens_file = self.storage_dir / "tokens.json"

    def get_credentials(self, user_id: str) -> Optional[Dict]:
        """Load stored credentials for a user."""
        user_file = self.storage_dir / f"tokens_{user_id}.json"
        if not user_file.exists():
            return None
        try:
            return json.loads(user_id and user_file.read_text() or "{}")
        except Exception:
            return None

    def save_credentials(self, user_id: str, credentials: Dict):
        """Store credentials for a user."""
        user_file = self.storage_dir / f"tokens_{user_id}.json"
        user_file.write_text(json.dumps(credentials, indent=2))

    def get_service(self, user_id: str):
        """Get an authorized Gmail API service."""
        if not HAS_GOOGLE_API:
            raise RuntimeError("Google API client not installed. Run: pip install google-api-python-client google-auth-oauthlib")

        creds_data = self.get_credentials(user_id)
        if not creds_data:
            raise RuntimeError(f"No Gmail credentials found for user {user_id}. Please connect Gmail first.")

        creds = Credentials(
            token=creds_data.get('access_token'),
            refresh_token=creds_data.get('refresh_token'),
            token_uri='https://oauth2.googleapis.com/token',
            client_id=creds_data.get('client_id'),
            client_secret=creds_data.get('client_secret'),
        )

        # Refresh if expired
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            # Save refreshed token
            self.save_credentials(user_id, {
                'access_token': creds.token,
                'refresh_token': creds.refresh_token,
                'client_id': creds.client_id,
                'client_secret': creds.client_secret,
            })

        return build('gmail', 'v1', credentials=creds)

    def send_email(self, user_id: str, to: str, subject: str, body: str) -> Dict[str, Any]:
        """Send an email via Gmail API."""
        service = self.get_service(user_id)

        message = MIMEText(body)
        message['to'] = to
        message['subject'] = subject

        raw = base64.urlsafe_b64encode(message.as_bytes()).decode('utf-8')

        result = service.users().messages().send(
            userId='me',
            body={'raw': raw}
        ).execute()

        return {
            'success': True,
            'message_id': result.get('id'),
            'thread_id': result.get('threadId'),
        }

    def list_emails(self, user_id: str, query: str = '', max_results: int = 10) -> list:
        """List emails matching a query."""
        service = self.get_service(user_id)

        results = service.users().messages().list(
            userId='me',
            q=query,
            maxResults=max_results
        ).execute()

        messages = results.get('messages', [])
        emails = []

        for msg in messages:
            msg_data = service.users().messages().get(
                userId='me',
                id=msg['id'],
                format='metadata',
                metadataHeaders=['From', 'Subject', 'Date']
            ).execute()

            headers = {h['name']: h['value'] for h in msg_data.get('payload', {}).get('headers', [])}
            emails.append({
                'id': msg['id'],
                'from': headers.get('From', ''),
                'subject': headers.get('Subject', ''),
                'date': headers.get('Date', ''),
                'snippet': msg_data.get('snippet', ''),
            })

        return emails

    def read_email(self, user_id: str, message_id: str) -> Dict[str, Any]:
        """Read a specific email."""
        service = self.get_service(user_id)

        msg = service.users().messages().get(
            userId='me',
            id=message_id,
            format='full'
        ).execute()

        headers = {h['name']: h['value'] for h in msg.get('payload', {}).get('headers', [])}

        # Get body
        body = ''
        parts = msg.get('payload', {}).get('parts', [])
        if parts:
            for part in parts:
                if part.get('mimeType') == 'text/plain':
                    body = base64.urlsafe_b64decode(part['body']['data']).decode('utf-8')
                    break
        elif msg.get('payload', {}).get('body', {}).get('data'):
            body = base64.urlsafe_b64decode(msg['payload']['body']['data']).decode('utf-8')

        return {
            'id': msg['id'],
            'from': headers.get('From', ''),
            'to': headers.get('To', ''),
            'subject': headers.get('Subject', ''),
            'date': headers.get('Date', ''),
            'body': body,
            'snippet': msg.get('snippet', ''),
        }

    def is_connected(self, user_id: str) -> bool:
        """Check if Gmail is connected for a user."""
        creds = self.get_credentials(user_id)
        return creds is not None and bool(creds.get('access_token'))


# Singleton instance
gmail_service = GmailService()
