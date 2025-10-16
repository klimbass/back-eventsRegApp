import { WebSocketServer } from 'ws';
import { handleConnection, handleMessage, handleClose } from './handlers.js';

export function setupWebSocket(server, allowedOrigins) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    const clientId = handleConnection(ws, req, allowedOrigins);

    if (!clientId) return; // if CORS blocked

    ws.on('message', (data) => {
      handleMessage(data, clientId);
    });

    ws.on('close', () => {
      handleClose(clientId);
    });

    ws.on('error', (error) => {
      console.log(`WebSocket error for client ${clientId}:`, error);
      handleClose(clientId);
    });
  });

  console.log('WebSocket server setup completed');
  return wss;
}
