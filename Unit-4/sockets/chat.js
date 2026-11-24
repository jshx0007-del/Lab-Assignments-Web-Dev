const { verifyToken, extractToken } = require('../utils/token');
const appEvents = require('../events/appEvents');

const DEFAULT_ROOM = 'general';
const ROOM_RE = /^[\w-]{1,30}$/;

function registerChat(io) {
  // Authenticate every socket connection with the same JWT used by the REST API
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || extractToken(socket.handshake.headers);
    if (!token) return next(new Error('No token provided'));
    try {
      socket.data.user = verifyToken(token);
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const { id: userId, username } = socket.data.user;
    console.log(`User connected: ${socket.id}`);

    // Personal room so the server can push events to one user (e.g. note updates)
    socket.join(`user:${userId}`);

    function joinRoom(room) {
      if (!ROOM_RE.test(room)) return socket.emit('chat_error', 'Invalid room name');
      socket.join(room);
      socket.data.rooms = (socket.data.rooms || new Set()).add(room);
      console.log(`${socket.id} joined room ${room}`);
      socket.emit('joined_room', room);
      socket.to(room).emit('system_message', { room, text: `${username} joined` });
    }

    joinRoom(DEFAULT_ROOM);

    socket.on('join_room', (room) => joinRoom(String(room)));

    socket.on('leave_room', (room) => {
      room = String(room);
      socket.leave(room);
      socket.data.rooms?.delete(room);
      socket.to(room).emit('system_message', { room, text: `${username} left` });
    });

    socket.on('chat_message', ({ room = DEFAULT_ROOM, text } = {}) => {
      room = String(room);
      text = typeof text === 'string' ? text.trim() : '';
      if (!text || text.length > 500) return socket.emit('chat_error', 'Message must be 1-500 characters');
      if (!socket.rooms.has(room)) return socket.emit('chat_error', `Join "${room}" first`);

      const message = { room, username, text, sentAt: new Date().toISOString() };
      console.log(`[${room}] ${username}: ${text}`);
      io.to(room).emit('chat_message', message);
    });

    socket.on('typing', ({ room = DEFAULT_ROOM } = {}) => {
      socket.to(String(room)).emit('typing', { room, username });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // Bridge EventEmitter -> Socket.IO: push note events to the owner's sockets
  ['created', 'updated', 'deleted'].forEach((action) => {
    appEvents.on(`note:${action}`, (note) => {
      io.to(`user:${note.owner}`).emit(`note:${action}`, note);
    });
  });
}

module.exports = registerChat;
