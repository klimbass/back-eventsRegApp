export const clients = new Map();
export const eventViewers = new Map();

export function addEventViewer(eventId, clientId) {
  if (!eventViewers.has(eventId)) {
    eventViewers.set(eventId, new Set());
  }
  eventViewers.get(eventId).add(clientId);
  console.log(`Client ${clientId} viewing event ${eventId}`);
}

export function removeEventViewer(eventId, clientId) {
  if (eventViewers.has(eventId)) {
    eventViewers.get(eventId).delete(clientId);
    console.log(`Client ${clientId} left event ${eventId}`);

    if (eventViewers.get(eventId).size === 0) {
      eventViewers.delete(eventId);
    }
  }
}

export function removeClientFromAllEvents(clientId) {
  eventViewers.forEach((viewers, eventId) => {
    if (viewers.has(clientId)) {
      viewers.delete(clientId);
      broadcastViewerCount(eventId);
    }
  });
}

export function broadcastToAll(message) {
  const messageString = JSON.stringify(message);
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(messageString);
    }
  });
}

export function broadcastViewerCount(eventId) {
  const viewers = eventViewers.get(eventId) || new Set();
  const count = viewers.size;

  console.log(`Event ${eventId} now has ${count} viewers`);

  broadcastToAll({
    type: 'VIEWER_COUNT_UPDATE',
    eventId: eventId,
    count: count,
  });
}
