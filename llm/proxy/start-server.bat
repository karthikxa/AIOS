@echo off
cd /d "%~dp0..\llm-proxy"
npm run dev -w server > server.log 2>&1
