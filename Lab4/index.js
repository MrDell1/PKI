const session = require("express-session");
const express = require("express");
const http = require("http");
const uuid = require("uuid");

const { WebSocketServer } = require("ws");

function onSocketError(err) {
  console.error(err);
}

const app = express();
const map = new Map();
const rooms = new Map();
//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
  saveUninitialized: false,
  secret: "secret",
  resave: false,
});

//
// Serve static files from the 'public' folder.
//
app.use(express.static("public"));
app.use(sessionParser);

app.get("/room/:roomId", function (request, response) {
  const roomId = request.params["roomId"];

  const wss = new WebSocketServer({ port: 8081 });

  server.on("upgrade", function (request, socket, head) {
    socket.on("error", onSocketError);

    console.log("Parsing session from request...");

    sessionParser(request, {}, () => {
      console.log("Session is parsed!");

      socket.removeListener("error", onSocketError);

      wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit("connection", ws, request);
      });
    });
  });

  function sendToSession(id, msg) {
    wss.clients.forEach(function each(client) {
      if (client === map.get(id) && client.readyState === 1) {
        client.send(msg);
      }
    });
  }

  function sendToAllConnectedSessionsInRoom(msg) {
    wss.clients.forEach(function each(client) {
      if (client === map.get(rooms.get(roomId)) && client.readyState === 1) {
        client.send(msg);
      }
    });
  }

  wss.on("connection", function (ws, request) {
    const id = uuid.v4();
    console.log(`Updating session for user ${id}`);
    map.set(id, ws);
    rooms.set(roomId, id);
    ws.on("error", console.error);

    ws.on("message", function (message) {
      sendToAllConnectedSessionsInRoom(message);
      console.log(`Received message ${message}`);
    });

    ws.on("close", function () {
      map.delete(id);
      console.log(`Client disconnected`);
    });
  });
});

const server = http.createServer(app);

server.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
//
// Create a WebSocket server completely detached from the HTTP server.
//
