import os
import sys

# Add backend directory to path
sys.path.append(os.path.abspath("backend"))

os.environ["ZED_PRO_BASE_URL"] = "https://server-llm-1.onrender.com/v1"
os.environ["ZED_PRO_API_KEY"] = "freellmapi-b8b35f76a87a2e3db4985258c26197a2f22ceabe528eb6ac"

from run_agent import AIAgent

def stream_cb(token):
    print(token, end="", flush=True)

print("Initializing AIAgent with model auto...")
agent = AIAgent(
    session_id="test-session",
    model="auto",
    quiet_mode=False,
    verbose_logging=True,
    base_url="https://server-llm-1.onrender.com/v1",
    api_key="freellmapi-b8b35f76a87a2e3db4985258c26197a2f22ceabe528eb6ac",
    stream_delta_callback=stream_cb
)

history = [
    {"role": "user", "content": "hi"},
    {"role": "assistant", "content": "I can help you with a variety of tasks! For example, I can: \u2022"}
]

print("\nRunning conversation with context...")
try:
    res = agent.run_conversation(
        user_message="are they are working real?",
        conversation_history=history
    )
    print("\nResult:", res)
except Exception as e:
    import traceback
    traceback.print_exc()
