const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
var cron = require("node-cron");
const axios = require("axios");

server.listen(3000, () => {
  console.log("listening on *:3000");
});

io.on("connection", (socket) => {
  cron.schedule("*/10 * * * * *", () => {
    axios
      .get("https://stilotechstore.com.br")
      .then((response) => {
        socket.on("chat message", (msg) => {
          io.emit("chat message", response.status);
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.headers);
          socket.on("chat message", (msg) => {
            io.emit("chat message", error.response.status);
          });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });

    axios
      .get("https://eesg.ltai.com.br/login/")
      .then((response) => {
        socket.on("eesg", (msg) => {
          io.emit("eesg", response.status);
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.headers);
          socket.on("eesg", (msg) => {
            io.emit("eesg", error.response.status);
          });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });

    axios
      .get("https://cemvs.ltai.com.br/login/")
      .then((response) => {
        socket.on("cemvs", (msg) => {
          io.emit("cemvs", response.status);
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.headers);
          socket.on("cemvs", (msg) => {
            io.emit("cemvs", error.response.status);
          });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
