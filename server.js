const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const gameclass = require('./gameclass');

var rooms = []

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
            if (!NewGame.started){
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
                    score: 0
                })
            }
            nsp.emit('playerupdate', NewGame.players)
            console.log(NewGame.players)
        }})
        socket.on('GameStart', () => {
            console.log(socket.id, NewGame.players);
            console.log(NewGame.isHost(socket))
            if (NewGame.isHost(socket)) {
                NewGame.started = true;
            }
            NewGame.turnindex = Math.floor(Math.random() * NewGame.players.length)
            nsp.emit('newturn', NewGame.turnindex)
            //todo: make this do something for the client other than log a message
        })
        socket.on('roll', (diceindex) => {
            if (socket.id == NewGame.players[NewGame.turnindex].id && NewGame.started == true) {
                console.log('diceroll');
                NewGame.roll(diceindex)
                
                nsp.emit('roll_Return',NewGame.dice)
                //NewGame.players[NewGame.turnindex].score++;
                //NewGame.nextturn();
                //nsp.emit('newturn', NewGame.turnindex)
            } else {
                console.log(socket.id + ' tried to roll but it is ' + NewGame.players[NewGame.turnindex].id + ' turn')
            }
        })
        socket.on('bank',()=>{
            NewGame.Bank(socket)
        });
        nsp.emit('msg', {
            msg: socket.id + " joined",
            sender: ""
        })
        socket.on('msg', (msg) => {
            console.log(socket.id + ' sent: ' + msg)
            
            nsp.emit('msg', {
                msg: msg,
                sender: socket.id
            })
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


http.listen(3000, function () {
    console.log('listening on *:3000');
});