const EventEmitter = require('events');

const appEvents = new EventEmitter();

appEvents.on('user:registered', (user) => {
  console.log(`[event] user registered: ${user.username} <${user.email}>`);
});

appEvents.on('user:loggedIn', (user) => {
  console.log(`[event] user logged in: ${user.username} at ${new Date().toISOString()}`);
});

appEvents.on('note:created', (note) => console.log(`[event] note created: "${note.title}" (${note._id})`));
appEvents.on('note:updated', (note) => console.log(`[event] note updated: "${note.title}" (${note._id})`));
appEvents.on('note:deleted', (note) => console.log(`[event] note deleted: "${note.title}" (${note._id})`));

module.exports = appEvents;
