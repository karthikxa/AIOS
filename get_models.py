import urllib.request
import json
import ssl

url = "https://server-llm-1.onrender.com/v1/models?available=true"
context = ssl.create_default_context()

try:
    print(f"Fetching models from {url}...")
    req = urllib.request.Request(url, headers={"User-Agent": "Python"})
    with urllib.request.urlopen(req, context=context, timeout=20) as resp:
        body = resp.read().decode("utf-8")
        parsed = json.loads(body)
        data = parsed.get("data", [])
        print(f"\nAvailable Models Count: {len(data)}")
        for m in data[:20]:
            print(f" - ID: {m.get('id')} | Name: {m.get('display_name')} | Platform: {m.get('platform')}")
except Exception as e:
    print(f"Error: {e}")
