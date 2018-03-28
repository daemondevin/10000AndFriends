const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const gameclass = require('./gameclass')
var rooms =[]
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/lobby.html')
})

app.get('/api/newgame/:gamename',(req,res)=>{
    res.send(req.params.gamename)
    var NewGame = new gameclass(req.params.gamename,io.of('/'+req.params.gamename))
    //var nsp = io.of('/'+NewGame.Name)
    rooms.push(NewGame);
    app.get('/'+NewGame.Name,(req,res)=>{
        console.log(NewGame.Name+' Joined');
        nsp.on('connection',NewGame.newconnection(socket))
        
        res.sendFile(__dirname+'/public/game.html')
    });
})
app.get('/api/getrooms',(req,res)=>{res.send({rooms:rooms})})

app.use(express.static(__dirname+'/public'))

io.on('connection', function(socket){
    //console.log(socket);
  });

http.listen(3000, function(){
    console.log('listening on *:3000');
  });