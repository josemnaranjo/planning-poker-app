import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { registerRoomHandlers } from './handlers/roomHandlers.js';
import { registerDeckHandlers } from './handlers/deckHandlers.js';
import { registerRoundHandlers } from './handlers/roundHandlers.js';
import { removeParticipant } from './roomManager.js';
import { sanitize } from './handlers/utils.js';
import { getRoom } from './roomManager.js';

const PORT = process.env.PORT ?? 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  console.log(`[+] Socket connected: ${socket.id}`);

  registerRoomHandlers(io, socket);
  registerDeckHandlers(io, socket);
  registerRoundHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log(`[-] Socket disconnected: ${socket.id}`);
    const code = removeParticipant(socket.id);
    if (code) {
      const room = getRoom(code);
      if (room) {
        io.to(code).emit('room-state', sanitize(room));
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
