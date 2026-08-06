import urllib.request
import json
import ssl
import sys

sys.stdout.reconfigure(encoding='utf-8')

url = "https://server-llm-1.onrender.com/v1/chat/completions"
headers = {
    "Content-Type": "application/json"
}

# Test keyless model IDs
models = [
    "pollinations/openai-fast",
    "kilo/poolside/laguna-m.1:free",
    "ovh/meta-llama-3-70b",
    "auto"
]

for m in models:
    print(f"\n--- Testing model: {m} ---")
    data = {
        "model": m,
        "messages": [
            {"role": "user", "content": "Hello!"}
        ]
    }
    req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
    context = ssl.create_default_context()
    try:
        with urllib.request.urlopen(req, context=context, timeout=20) as resp:
            print(f"Status: {resp.status}")
            body = resp.read().decode("utf-8")
            parsed = json.loads(body)
            print("Response:", parsed["choices"][0]["message"]["content"])
            break
    except Exception as e:
        print(f"Error: {e}")
        if hasattr(e, "read"):
            try:
                print(e.read().decode("utf-8"))
            except:
                pass
