# Lab 4 - Secure Connect and Communication Platform

Node.js + Express backend with JWT auth, bcrypt, RBAC, an owner-scoped Notes API, EventEmitter events and a Socket.IO chat.

## API

Send the token as `Authorization: Bearer <token>`. No token returns `403`, a bad or expired token returns `401`. Emails in `ADMIN_EMAILS` get the `admin` role at signup.

**POST /api/auth/signup** - register

![SignUp](screenshots/image.png)

**POST /api/auth/login** - returns `{ message, token }`

![Login](screenshots/image1.png)

**POST /api/auth/logout** - log out

![Logout](screenshots/image2.png)

**GET /api/auth/me** - current user (JWT)

![Logged in user](screenshots/image3.png)

**POST /api/notes** - create note (JWT)

![Note created](screenshots/image4.png)

**GET /api/notes** - list own notes (JWT)

![Get notes](screenshots/image5.png)

**GET /api/notes/:id** - get one note (JWT)

![Get note by id](screenshots/image6.png)

**PUT /api/notes/:id** - update note (JWT)

![Update Note](screenshots/image7.png)

**DELETE /api/notes/:id** - delete note (JWT)

![Deleted the note](screenshots/image8.png)

**GET /api/admin/users** - list users (JWT + admin)

![Users with role: admin](screenshots/image9.png)
![Forbidden as role is user](screenshots/image10.png)

## Socket.IO

Connect with `io({ auth: { token } })`. Events: `join_room`, `leave_room`, `chat_message { room, text }`, `typing { room }`. Everyone auto-joins `general`.

![Socket](screenshots/image11.png)

## EventEmitter

`events/appEvents.js` emits `user:registered`, `user:loggedIn` and `note:created|updated|deleted`; note events are also pushed to the owner's sockets.

![Event Listener](screenshots/image12.png)