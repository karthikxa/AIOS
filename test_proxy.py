import urllib.request
import json
import ssl

url = "https://server-llm-1.onrender.com/v1/chat/completions"
headers = {
    "Content-Type": "application/json"
}
data = {
    "model": "auto",
    "messages": [
        {"role": "user", "content": "hi"}
    ]
}

req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
context = ssl.create_default_context()

try:
    print(f"Sending request to {url}...")
    with urllib.request.urlopen(req, context=context, timeout=30) as resp:
        print(f"Status Code: {resp.status}")
        body = resp.read().decode("utf-8")
        print("Response Body:")
        print(body[:1000])
except Exception as e:
    print(f"Error: {e}")
    if hasattr(e, "read"):
        print(e.read().decode("utf-8"))
