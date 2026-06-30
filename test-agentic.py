import httpx
import json

url = "https://backend-server-6ghr.onrender.com/api/chat"
headers = {
    "Authorization": "Bearer freellmapi-b8b35f76a87a2e3db4985258c26197a2f22ceabe528eb6ac",
    "Content-Type": "application/json"
}

payload = {
    "model": "auto",
    "messages": [{"role": "user", "content": "are they are working real?"}],
    "stream": True,
    "dashboard_state": {
        "activeModel": "zed-pro",
        "models": [],
        "agents": [],
        "schedules": [],
        "plugins": []
    }
}

try:
    print("Sending agentic streaming POST request to Render...")
    with httpx.stream("POST", url, json=payload, headers=headers, timeout=60.0) as r:
        print("Status:", r.status_code)
        for line in r.iter_lines():
            if line:
                print(line)
except Exception as e:
    print("Error connecting:", e)
