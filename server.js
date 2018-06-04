const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const gameclass = require('./gameclass');
const gamelogic = require('./gamelogic');
var rooms = []

console.log(gamelogic.isHost)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/lobby.html')
})

app.get('/api/newgame/:gamename', (req, res) => {
    res.send(req.params.gamename)
    var NewGame = new gameclass(req.params.gamename)
    var nsp = io.of('/' + NewGame.Name)
    rooms.push(NewGame);

    nsp.on('connection', (socket) => {
        console.log(socket.id);
        console.log(NewGame)
        socket.on('playerjoin', (player) => {
            console.log(NewGame.players.length)
            if (NewGame.players.length == 0) {
                NewGame.players.push({
                    name: player.name,
                    id: socket.id,
                    host: true,
                    score: 0
                })
            } else {
                NewGame.players.push({
                    name: player.name,
                    id: socket.id,
                    host: false,
                    score:0
                })
            }
            nsp.emit('playerupdate',NewGame.players)
            console.log(NewGame.players)
        })
        socket.on('GameStart',()=>{
            console.log(socket.id,NewGame.players);
            console.log(gamelogic.isHost(socket,NewGame))
            if(gamelogic.isHost(socket,NewGame)){
            NewGame.started=true;}
            var turnindex =  Math.floor(Math.random() * NewGame.players.length)
            while(NewGame.started){

                if(Newgame.players.map(player => player.score).find((score)=>score>21)){
                    console.log("game was won")}
            }
        })

        nsp.emit('msg', {msg:socket.id + " joined",sender:""})
        socket.on('msg', (msg) => {
            console.log(socket.id + ' sent: ' + msg)
            //to do: as it stands this emits to many messages. 
            nsp.emit('msg', {msg:msg,sender:socket.id})
        })

    })

    app.get('/' + NewGame.Name, (req, res) => {
        
         res.sendFile(__dirname + '/public/game.html')
    });
})
app.get('/api/getrooms', (req, res) => {
    res.send({
        rooms: rooms
    })
})

app.use(express.static(__dirname + '/public'))

//io.on('connection', function(socket){
//console.log(socket);
//  });

http.listen(3001, function () {
    console.log('listening on *:3001');
});