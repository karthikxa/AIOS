// Browser Live Stream Client for zed Computer Mode
// Connects to KasmVNC server for real-time browser control

class BrowserStream {
  constructor(serverUrl, options = {}) {
    this.serverUrl = serverUrl;
    this.wsUrl = serverUrl.replace('https://', 'wss://').replace('http://', 'ws://');
    this.ws = null;
    this.sessionId = null;
    this.canvas = null;
    this.ctx = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;

    // Callbacks
    this.onConnect = options.onConnect || (() => {});
    this.onDisconnect = options.onDisconnect || (() => {});
    this.onFrame = options.onFrame || (() => {});
    this.onError = options.onError || (() => {});

    // Bind methods
    this.handleMessage = this.handleMessage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  // Connect to the browser server
  async connect() {
    return new Promise((resolve, reject) => {
      console.log('[BrowserStream] Connecting to:', this.wsUrl);

      this.ws = new WebSocket(this.wsUrl);

      this.ws.onopen = () => {
        console.log('[BrowserStream] Connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.onConnect();
        resolve();
      };

      this.ws.onmessage = this.handleMessage;
      this.ws.onclose = this.handleClose;
      this.ws.onerror = this.handleError;
    });
  }

  // Disconnect from server
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }

  // Handle incoming messages
  handleMessage(event) {
    try {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case 'session_created':
          this.sessionId = msg.sessionId;
          console.log('[BrowserStream] Session created:', msg.sessionId);
          break;

        case 'ready':
          console.log('[BrowserStream] Server ready');
          break;

        case 'frame':
          this.onFrame(msg.data, msg.timestamp);
          break;

        case 'navigate':
          console.log('[BrowserStream] Navigated to:', msg.url);
          break;

        case 'error':
          console.error('[BrowserStream] Error:', msg.message);
          this.onError(new Error(msg.message));
          break;

        case 'pong':
          // Heartbeat response
          break;
      }
    } catch (e) {
      console.error('[BrowserStream] Parse error:', e);
    }
  }

  // Handle connection close
  handleClose() {
    console.log('[BrowserStream] Disconnected');
    this.isConnected = false;
    this.onDisconnect();

    // Attempt to reconnect
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      console.log(`[BrowserStream] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
      setTimeout(() => this.connect(), delay);
    }
  }

  // Handle connection error
  handleError(error) {
    console.error('[BrowserStream] WebSocket error:', error);
    this.onError(error);
  }

  // Send message to server
  send(msg) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  // Navigate to URL
  navigate(url) {
    this.send({ type: 'navigate', url });
  }

  // Mouse events
  mouseDown(x, y, button = 0) {
    this.send({ type: 'mouse', event: 'down', x, y, button });
  }

  mouseUp(x, y, button = 0) {
    this.send({ type: 'mouse', event: 'up', x, y, button });
  }

  mouseMove(x, y) {
    this.send({ type: 'mouse', event: 'move', x, y });
  }

  // Keyboard events
  keyDown(key, code, modifiers = {}) {
    this.send({ type: 'keyboard', event: 'down', key, code, modifiers });
  }

  keyUp(key, code, modifiers = {}) {
    this.send({ type: 'keyboard', event: 'up', key, code, modifiers });
  }

  typeText(text) {
    for (const char of text) {
      this.keyDown(char, `Key${char.toUpperCase()}`);
      this.keyUp(char, `Key${char.toUpperCase()}`);
    }
  }

  // Scroll
  scroll(deltaX, deltaY) {
    this.send({ type: 'scroll', deltaX, deltaY });
  }

  // Request screenshot
  requestScreenshot(quality = 80) {
    this.send({ type: 'screenshot', quality });
  }

  // Heartbeat
  startHeartbeat(interval = 30000) {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.send({ type: 'ping' });
      }
    }, interval);
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }
}

// Export for use in zed app
window.BrowserStream = BrowserStream;
