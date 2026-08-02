import uvicorn, sys, os, subprocess
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

USE_CUA = os.environ.get("USE_CUA", "auto").lower()

def _cua_image_cached() -> bool:
    """Check if CUA Docker image is already cached locally."""
    try:
        result = subprocess.run(
            ["docker", "images", "-q", "trycua/cua-xfce:latest"],
            capture_output=True, text=True, timeout=3
        )
        return bool(result.stdout.strip())
    except Exception:
        return False

if USE_CUA == "auto":
    # Smart auto-fallback: cached image → CUA → legacy
    if _cua_image_cached():
        print("[start_agent] Docker image cached, using CUA Ubuntu agent (instant boot!)")
        USE_CUA = True
    else:
        print("[start_agent] Docker image not cached, using legacy Windows agent (no download)")
        USE_CUA = False
else:
    USE_CUA = USE_CUA not in ("0", "false", "no", "off")

if USE_CUA:
    try:
        from ubuntu_agent import app, STREAM_FPS
        print("[start_agent] Ubuntu CUA desktop agent loaded")
    except ImportError as e:
        print(f"[start_agent] CUA import failed: {e}, falling back to legacy")
        USE_CUA = False

if not USE_CUA:
    sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'agent'))
    from computer import app, STREAM_FPS
    print("[start_agent] Legacy Windows desktop agent loaded")

port = int(os.environ.get('PORT', '6901'))
uvicorn.run(app, host='0.0.0.0', port=port)
