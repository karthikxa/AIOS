import { Router } from 'express';
import { randomBytes } from 'crypto';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'freellmapi', 'server', 'data', 'freeapi.db');

function getDb() {
  try {
    return new Database(DB_PATH, { readonly: false });
  } catch {
    return null;
  }
}

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.settings.readonly",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.metadata",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/presentations",
  "https://www.googleapis.com/auth/tasks",
  "https://www.googleapis.com/auth/contacts",
  "https://www.googleapis.com/auth/contacts.other.readonly",
  "https://www.googleapis.com/auth/directory.readonly",
  "https://www.googleapis.com/auth/chat.messages",
  "https://www.googleapis.com/auth/chat.messages.create",
  "https://www.googleapis.com/auth/chat.spaces",
  "https://www.googleapis.com/auth/chat.spaces.create",
  "https://www.googleapis.com/auth/chat.memberships",
  "https://www.googleapis.com/auth/meetings.space.created",
  "https://www.googleapis.com/auth/meetings.space.readonly",
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtubepartner",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
  "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
  "https://www.googleapis.com/auth/fitness.activity.read",
  "https://www.googleapis.com/auth/fitness.activity.write",
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.body.write",
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
  "https://www.googleapis.com/auth/fitness.sleep.read",
  "https://www.googleapis.com/auth/fitness.sleep.write",
  "https://www.googleapis.com/auth/fitness.location.read",
  "https://www.googleapis.com/auth/fitness.location.write",
  "https://www.googleapis.com/auth/classroom.courses",
  "https://www.googleapis.com/auth/classroom.courses.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.students",
  "https://www.googleapis.com/auth/classroom.coursework.me",
  "https://www.googleapis.com/auth/classroom.rosters",
  "https://www.googleapis.com/auth/classroom.rosters.readonly",
  "https://www.googleapis.com/auth/classroom.announcements",
  "https://www.googleapis.com/auth/classroom.guardianlinks.students",
  "https://www.googleapis.com/auth/photoslibrary",
  "https://www.googleapis.com/auth/photoslibrary.readonly",
  "https://www.googleapis.com/auth/photoslibrary.appendonly",
  "https://www.googleapis.com/auth/photoslibrary.sharing",
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
];

export const PLUGIN_PROVIDERS = {
  gmail: {
    name: 'Gmail', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/gmail.svg',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-drive': {
    name: 'Google Drive', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-drive.svg',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  calendar: {
    name: 'Google Calendar', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/calendar.svg',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-docs': {
    name: 'Google Docs', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-docs.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-sheets': {
    name: 'Google Sheets', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-sheets.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-slides': {
    name: 'Google Slides', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-slides.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-tasks': {
    name: 'Google Tasks', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-tasks.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-contacts': {
    name: 'Google Contacts', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-contacts.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-chat': {
    name: 'Google Chat', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-chat.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-meet': {
    name: 'Google Meet', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-meet.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  youtube: {
    name: 'YouTube', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/youtube.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-fit': {
    name: 'Google Fitness', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-fit.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-classroom': {
    name: 'Google Classroom', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-classroom.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  'google-photos': {
    name: 'Google Photos', provider: 'google',
    scopes: GOOGLE_SCOPES,
    icon: 'assets/plugins/google-photos.png',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  notion: {
    name: 'Notion', provider: 'notion',
    scopes: [],
    icon: 'assets/plugins/notion.svg',
    authUrl: 'https://api.notion.com/v1/oauth/authorize',
    tokenUrl: 'https://api.notion.com/v1/oauth/token',
  },
  slack: {
    name: 'Slack', provider: 'slack',
    scopes: ['channels:read', 'channels:history', 'chat:write', 'files:read', 'users:read'],
    icon: 'assets/plugins/slack.svg',
    authUrl: 'https://slack.com/oauth/v2/authorize',
    tokenUrl: 'https://slack.com/api/oauth.v2.access',
  },
  github: {
    name: 'GitHub', provider: 'github',
    scopes: ['repo', 'user'],
    icon: 'assets/plugins/github.svg',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
  },
  facebook: {
    name: 'Facebook', provider: 'facebook',
    scopes: ['pages_manage_posts', 'pages_read_engagement'],
    icon: 'assets/plugins/facebook.svg',
    authUrl: 'https://www.facebook.com/v22.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v22.0/oauth/access_token',
  },
  trello: {
    name: 'Trello', provider: 'trello',
    scopes: ['read', 'write'],
    icon: 'assets/plugins/trello.svg',
    authUrl: 'https://trello.com/1/authorize',
    tokenUrl: 'https://trello.com/1/OAuthGetAccessToken',
  },
  dropbox: {
    name: 'Dropbox', provider: 'dropbox',
    scopes: ['files.metadata.read', 'files.content.read', 'files.content.write'],
    icon: 'assets/plugins/dropbox.svg',
    authUrl: 'https://www.dropbox.com/oauth2/authorize',
    tokenUrl: 'https://api.dropboxapi.com/oauth2/token',
  },
  airtable: {
    name: 'Airtable', provider: 'airtable',
    scopes: ['data.records:read', 'data.records:write', 'schema.bases:read'],
    icon: 'assets/plugins/airtable.svg',
    authUrl: 'https://airtable.com/oauth2/v1/authorize',
    tokenUrl: 'https://airtable.com/oauth2/v1/token',
  },
};

function getConfig(pluginId, redirectBase = 'http://localhost:8000') {
  const db = getDb();
  if (!db) return null;
  try {
    let row = db.prepare('SELECT * FROM plugin_oauth_configs WHERE plugin_id = ?').get(pluginId);
    if (!row) {
      const def = PLUGIN_PROVIDERS[pluginId];
      if (def) {
        let clientId = '';
        let clientSecret = '';
        if (def.provider === 'google') {
          clientId = process.env.GOOGLE_CLIENT_ID || '277639993068-1hss7ehilhvc63hmskak8obbin617qnr.apps.googleusercontent.com';
          clientSecret = process.env.GOOGLE_CLIENT_SECRET || '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';
        } else {
          const envPrefix = pluginId.toUpperCase().replace(/-/g, '_');
          clientId = process.env[`${envPrefix}_CLIENT_ID`] || '';
          clientSecret = process.env[`${envPrefix}_CLIENT_SECRET`] || '';
        }
        if (clientId) {
          row = {
            plugin_id: pluginId,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: `${redirectBase}/api/plugins/${pluginId}/oauth/callback`,
          };
        }
      }
    }
    return row || null;
  } finally {
    db.close();
  }
}

function saveConfig(pluginId, clientId, clientSecret, redirectUri) {
  const db = getDb();
  if (!db) return;
  try {
    db.prepare(`
      INSERT INTO plugin_oauth_configs (plugin_id, client_id, client_secret, redirect_uri, enabled, updated_at)
      VALUES (?, ?, ?, ?, 1, datetime('now'))
      ON CONFLICT(plugin_id) DO UPDATE SET
        client_id = excluded.client_id,
        client_secret = excluded.client_secret,
        redirect_uri = excluded.redirect_uri,
        enabled = 1,
        updated_at = datetime('now')
    `).run(pluginId, clientId, clientSecret, redirectUri);
  } finally {
    db.close();
  }
}

function getToken(pluginId) {
  const db = getDb();
  if (!db) return null;
  try {
    return db.prepare('SELECT * FROM plugin_tokens WHERE plugin_id = ?').get(pluginId) || null;
  } finally {
    db.close();
  }
}

function saveToken(pluginId, accessToken, refreshToken, scope, userInfo, expiresAt) {
  const db = getDb();
  if (!db) return;
  try {
    db.prepare(`
      INSERT INTO plugin_tokens (plugin_id, access_token, refresh_token, scope, user_info, connected_at, updated_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      ON CONFLICT(plugin_id) DO UPDATE SET
        access_token = excluded.access_token,
        refresh_token = excluded.refresh_token,
        scope = excluded.scope,
        user_info = excluded.user_info,
        connected_at = COALESCE(plugin_tokens.connected_at, excluded.connected_at),
        updated_at = datetime('now')
    `).run(pluginId, accessToken, refreshToken, scope, userInfo);
  } finally {
    db.close();
  }
}

function deletePluginToken(pluginId) {
  const db = getDb();
  if (!db) return;
  try {
    db.prepare('DELETE FROM plugin_tokens WHERE plugin_id = ?').run(pluginId);
  } finally {
    db.close();
  }
}

function storeState(state, pluginId) {
  const db = getDb();
  if (!db) return;
  try {
    db.prepare('INSERT INTO plugin_oauth_states (state, plugin_id, created_at) VALUES (?, ?, ?)').run(state, pluginId, Date.now());
  } finally {
    db.close();
  }
}

function consumeState(state) {
  const db = getDb();
  if (!db) return null;
  try {
    const row = db.prepare('SELECT * FROM plugin_oauth_states WHERE state = ?').get(state);
    if (row) {
      db.prepare('DELETE FROM plugin_oauth_states WHERE state = ?').run(state);
    }
    return row || null;
  } finally {
    db.close();
  }
}

function exchangeCode(provider, code, clientId, clientSecret, redirectUri) {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  const tokenUrl = provider.tokenUrl;
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  if (provider.provider === 'github') {
    headers['Accept'] = 'application/json';
  }
  if (provider.provider === 'notion') {
    const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    headers['Authorization'] = `Basic ${encoded}`;
  }

  return fetch(tokenUrl, {
    method: 'POST',
    headers,
    body: params,
  }).then(r => r.json());
}

async function fetchUserInfo(provider, accessToken) {
  try {
    switch (provider.provider) {
      case 'google':
        const g = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then(r => r.json());
        return g.email ? JSON.stringify({ email: g.email, name: g.name }) : null;
      case 'github':
        const gh = await fetch('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
        }).then(r => r.json());
        return gh.login ? JSON.stringify({ login: gh.login, name: gh.name, email: gh.email }) : null;
      case 'slack':
        const s = await fetch('https://slack.com/api/auth.test', {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then(r => r.json());
        return s.ok ? JSON.stringify({ team: s.team, user: s.user, email: s.email }) : null;
      case 'notion':
        const n = await fetch('https://api.notion.com/v1/users/me', {
          headers: { Authorization: `Bearer ${accessToken}`, 'Notion-Version': '2022-06-28' },
        }).then(r => r.json());
        return n.name ? JSON.stringify({ name: n.name, email: n.person?.email, type: n.type }) : null;
      default:
        return null;
    }
  } catch {
    return null;
  }
}

export function createPluginRouter(redirectBase) {
  const router = Router();

  router.get('/', (req, res) => {
    const all = {};
    for (const [id, def] of Object.entries(PLUGIN_PROVIDERS)) {
      const config = getConfig(id, redirectBase);
      const token = getToken(id);
      all[id] = {
        id,
        name: def.name,
        connected: !!token,
        scope: token?.scope || null,
        user_info: token?.user_info ? JSON.parse(token.user_info) : null,
        connected_at: token?.connected_at || null,
        has_config: !!config,
      };
    }
    res.json(all);
  });

  router.get('/:id/config', (req, res) => {
    const def = PLUGIN_PROVIDERS[req.params.id];
    if (!def) return res.status(404).json({ error: 'Unknown plugin' });
    const config = getConfig(req.params.id, redirectBase);
    res.json({
      plugin_id: req.params.id,
      client_id: config?.client_id || '',
      redirect_uri: config?.redirect_uri || `${redirectBase}/api/plugins/${req.params.id}/oauth/callback`,
      configured: !!config,
      default_redirect: `${redirectBase}/api/plugins/${req.params.id}/oauth/callback`,
    });
  });

  router.post('/:id/config', (req, res) => {
    const def = PLUGIN_PROVIDERS[req.params.id];
    if (!def) return res.status(404).json({ error: 'Unknown plugin' });
    const { client_id, client_secret, redirect_uri } = req.body || {};
    if (!client_id) return res.status(400).json({ error: 'client_id is required' });
    saveConfig(
      req.params.id,
      client_id,
      client_secret || '',
      redirect_uri || `${redirectBase}/api/plugins/${req.params.id}/oauth/callback`
    );
    res.json({ ok: true });
  });

  router.get('/:id/oauth/start', (req, res) => {
    const def = PLUGIN_PROVIDERS[req.params.id];
    if (!def) return res.status(404).json({ error: 'Unknown plugin' });

    const config = getConfig(req.params.id, redirectBase);
    if (!config?.client_id) {
      return res.status(400).json({ error: 'client_id is required — configure via POST /api/plugins/:id/config' });
    }

    const state = randomBytes(16).toString('hex');
    storeState(state, req.params.id);

    const params = new URLSearchParams({
      client_id: config.client_id,
      redirect_uri: config.redirect_uri,
      response_type: 'code',
      scope: def.scopes.join(' '),
      state,
    });

    if (def.provider === 'google') {
      params.set('access_type', 'offline');
      params.set('prompt', 'consent');
    }

    const url = `${def.authUrl}?${params.toString()}`;
    res.json({ url, state: 'oauth' });
  });

  router.get('/:id/oauth/callback', async (req, res) => {
    const def = PLUGIN_PROVIDERS[req.params.id];
    if (!def) return res.status(404).send('Unknown plugin');

    const { code, state, error } = req.query;
    if (error) {
      return res.redirect(`${redirectBase.replace(/\/api\/plugins.*$/, '')}/plugins?error=${encodeURIComponent(error)}`);
    }
    if (!code) {
      return res.status(400).send('Missing authorization code');
    }

    const storedState = consumeState(state || '');
    if (!storedState) {
      return res.status(400).send('Invalid or expired state');
    }

    const config = getConfig(req.params.id, redirectBase);
    if (!config?.client_id) {
      return res.status(400).send('Plugin not configured');
    }

    try {
      const tokenData = await exchangeCode(def, code, config.client_id, config.client_secret, config.redirect_uri);

      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token || null;
      const scope = tokenData.scope || def.scopes.join(' ');

      if (!accessToken) {
        console.error('[oauth] Token exchange failed:', JSON.stringify(tokenData));
        return res.redirect(`${redirectBase.replace(/\/api\/plugins.*$/, '')}/plugins?error=token_exchange_failed`);
      }

      let userInfo = null;
      try {
        userInfo = await fetchUserInfo(def, accessToken);
      } catch {}

      saveToken(req.params.id, accessToken, refreshToken, scope, userInfo, tokenData.expires_in ? Date.now() + tokenData.expires_in * 1000 : null);

      const base = redirectBase.replace(/\/api\/plugins.*$/, '');
      res.redirect(`${base}/plugins?connected=${req.params.id}`);
    } catch (err) {
      console.error('[oauth] Token exchange error:', err.message);
      res.redirect(`${redirectBase.replace(/\/api\/plugins.*$/, '')}/plugins?error=exchange_error`);
    }
  });

  router.delete('/:id/disconnect', (req, res) => {
    const def = PLUGIN_PROVIDERS[req.params.id];
    if (!def) return res.status(404).json({ error: 'Unknown plugin' });
    deletePluginToken(req.params.id);
    res.json({ ok: true });
  });

  return router;
}
