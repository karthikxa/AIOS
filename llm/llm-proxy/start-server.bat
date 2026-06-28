@echo off
:: AVDE FreeLLMAPI Startup Script
:: Run this to start the LLM proxy server.
:: First-time setup: run setup.mjs once before this.

echo Starting FreeLLMAPI server...
cd /d "%~dp0"

:: Generate .env if it doesn't exist
if not exist ".env" (
    echo Creating .env from setup script...
    node setup.mjs
)

:: Start the server
npm run dev -w server
