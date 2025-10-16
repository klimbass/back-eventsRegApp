import express from 'express';
import pino from 'pino-http';
import { env } from '../utils/env.js';
import cors from 'cors';
import { errorHandler } from '../middlewares/errorHandler.js';
import { notFoundHandler } from '../middlewares/notFoundHandler.js';
import router from './routers/index.js';
import http from 'http';
import { setupWebSocket } from './websocket/index.js';

const PORT = Number(env('PORT', 3000));

const allowedOrigins = [env('DEPLOYEDFRONT', ' '), env('LOCALHOST')];

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
  });

  app.use(router);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const server = http.createServer(app);
  //websocket connection
  setupWebSocket(server, allowedOrigins);

  server.listen(PORT, () => {
    console.log(`Server with WebSocket is running on port ${PORT}`);
  });
};
