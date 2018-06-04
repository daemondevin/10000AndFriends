const winscore=100

const isHost = function isHost(socket,game){
    for (i=0;i<game.players.length;i++){
        if(socket.id==game.players[i].id){
            console.log(socket.id==game.players[i].id)
            return true
        }
        return false
    }
}
const iswon = function iswon(game){
    return Newgame.players.map(player => player.score).find((score)=>score>winscore)
}

module.exports.isHost=isHost;