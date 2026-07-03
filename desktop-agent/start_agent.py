import uvicorn, sys, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'agent'))
from agent.main import app
uvicorn.run(app, host='0.0.0.0', port=8765)
