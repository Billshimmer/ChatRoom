var express = require('express');
var app = require("express")();
var http = require('http').createServer(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  })
})

io.on("connection", function(socket){
  socket.on("chat message", function (msg) {
    console.log("服务端消息: " + msg);
    io.sockets.emit('chat message', msg);
  })
})



http.listen(2022, function () {
  console.log("welcome to our chat room!");
})