const session = require("express-session");
const express = require("express");
const http = require("http");
const uuid = require("uuid");
const parse = require("url")


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

const server = http.createServer(app);

  const wss = new WebSocketServer({ port: 8081 });

  server.on("upgrade", function (request, socket, head) {
    socket.on("error", onSocketError);
    const {pathname} = parse.parse(request.url);
    const parsedUrl = new URL(request.url, `http://localhost:8081`);
    const searchParams = parsedUrl.searchParams.get("roomId");
    if(pathname === '/room' && searchParams){
      const roomId = searchParams;
      console.log(roomId, searchParams);
      console.log("Parsing session from request...");

      sessionParser(request, {}, () => {
        console.log("Session is parsed!");
        request.session.roomId = roomId;
        socket.removeListener("error", onSocketError);
  
        wss.handleUpgrade(request, socket, head, function (ws) {
          wss.emit("connection", ws, request);
        });
      });
    }
    else{
      socket.destroy();
    }

  });

  function sendToSession(id, msg) {
    wss.clients.forEach(function each(client) {
      if (client === map.get(id) && client.readyState === 1) {
        client.send(msg);
      }
    });
  }

  function sendToAllConnectedSessionsInRoom(id, msg) {
    wss.clients.forEach(function each(client) {
     map.forEach(function (value, userId) {
      console.log(userId);
      if (rooms.get(userId) === rooms.get(id) && client === map.get(userId) && client.readyState === 1) {
        console.log(`Send ${msg} to ${map.get(value)}`)
        client.send(msg);
      }
     })
    });
  }

  wss.on("connection", function (ws, request) {
    const id = uuid.v4();
    console.log(`Updating session for user ${id}`);
    map.set(id, ws);
    rooms.set(id, request.session.roomId);
    ws.on("error", console.error);

    ws.on("message", function (message) {
      sendToAllConnectedSessionsInRoom(id, message);
      console.log(`Received message ${message}`);
    });

    ws.on("close", function () {
      map.delete(id);
      console.log(`Client disconnected`);
    });
  });



server.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
//
// Create a WebSocket server completely detached from the HTTP server.
//
