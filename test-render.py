import httpx

url = "https://server-llm-1.onrender.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer freellmapi-b8b35f76a87a2e3db4985258c26197a2f22ceabe528eb6ac",
    "Content-Type": "application/json"
}
payload = {
    "model": "auto",
    "messages": [{"role": "user", "content": "hi, reply in one word"}]
}

try:
    print("Sending POST request to Render...")
    resp = httpx.post(url, json=payload, headers=headers, timeout=30.0)
    print("Status:", resp.status_code)
    print("Response:", resp.text)
except Exception as e:
    print("Error connecting:", e)
