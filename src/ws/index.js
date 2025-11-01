import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { registerHandlers } from './handler.js';
import { wsAuth } from './auth.middleware.js';

export function initWS(app) {
  const httpServer = createServer(app);

  const io = new IOServer(httpServer, {
    cors: { 
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
    // path: '/socket.io' // اختياري، الافتراضي يعمل fine
  });

  io.use(wsAuth);
  registerHandlers(io);

  return httpServer;  
}
