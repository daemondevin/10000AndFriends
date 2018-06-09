const winscore=100

const isHost = function isHost(socket){
    for (i=0;i<this.players.length;i++){
        if(socket.id==this.players[i].id){
            console.log(socket.id==this.players[i].id)
            return true
        }
        return false
    }
}
const isWon = function isWon(game){
    return game.players.map(player => player.score).findIndex((score)=>score>winscore)
}

module.exports.isHost=isHost;
module.exports.isWon=isWon;