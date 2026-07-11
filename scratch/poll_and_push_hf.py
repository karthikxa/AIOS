import subprocess
import time
import os

repo_dir = r"c:\Users\balur\Downloads\AVDE\desktop-agent\huggingface-space"
print("Auto-publisher started. Waiting for you to create the Space on Hugging Face...")
print("Once you create 'browser-agent-stream' with Docker SDK, this script will automatically push the code.")

while True:
    try:
        # Run git push command
        res = subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=repo_dir,
            capture_output=True,
            text=True
        )
        if res.returncode == 0:
            print("\n[SUCCESS] Successfully pushed latest updates to the recreated Hugging Face Space!")
            print("Output:\n", res.stdout)
            break
        else:
            # Check if it was rejected or repo not found
            err = res.stderr.lower()
            if "not found" in err or "cannot access" in err:
                print(".", end="", flush=True)
            else:
                print(f"\n[INFO] Git status code: {res.returncode}. Stderr: {res.stderr.strip()}")
    except Exception as e:
        print(f"\n[ERROR] Exception during push: {e}")
    
    time.sleep(5)
