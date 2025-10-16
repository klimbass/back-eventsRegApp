import {
  clients,
  addEventViewer,
  removeEventViewer,
  removeClientFromAllEvents,
  broadcastViewerCount,
} from './utils.js';

// handler new connection
export function handleConnection(ws, req, allowedOrigins) {
  // CORS
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.includes(origin)) {
    ws.close();
    console.log(`WebSocket blocked by CORS: ${origin}`);
    return null;
  }

  // create client ID
  const clientId = Math.random().toString(36).substring(7);
  clients.set(clientId, ws);
  console.log(`Client ${clientId} connected. Total clients: ${clients.size}`);

  ws.send(
    JSON.stringify({
      type: 'WELCOME',
      clientId: clientId,
      message: 'Successfully connected to WebSocket server',
    }),
  );

  return clientId;
}

//  handler massage from client
export function handleMessage(data, clientId) {
  try {
    const message = JSON.parse(data);
    console.log(`Message from ${clientId}:`, message);

    switch (message.type) {
      case 'VIEWING_EVENT':
        addEventViewer(message.eventId, clientId);
        broadcastViewerCount(message.eventId);
        break;

      case 'LEFT_EVENT':
        removeEventViewer(message.eventId, clientId);
        broadcastViewerCount(message.eventId);
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  } catch (error) {
    console.log('Error parsing message:', error);
  }
}

//  handler close connection
export function handleClose(clientId) {
  removeClientFromAllEvents(clientId);
  clients.delete(clientId);
  console.log(
    `Client ${clientId} disconnected. Total clients: ${clients.size}`,
  );
}
