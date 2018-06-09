function ofakind(eval, dice) {
    for (i = 1; i < 7; i++) {
        if (dice.filter((n) => {
                return n == i
            }).length == eval) {
            return [true, i]
        }
    }
}

const winscore = 100

function game(Name) {
    this.Name = Name
    this.players = []
    this.messages = []
    this.started = false;
    this.turnindex = 0;
    this.fistconnection = false;
    this.turn={roll_count: 0,score:0}
    this.dice=[].fill(undefined,0,5)
    this.diceindex = []

    this.nextturn = function nextturn() {
        this.turnindex = (this.turnindex + 1) % this.players.length
        this.dice.fill(undefined,0,6)
    }

    this.roll= function(index){
        
        for(let i=0;i<index.length;i++){
            debugger
            this.dice[index[i]]=Math.floor(Math.random()*6+1)
            
        }
        
        //for(let i=0;i<count;i++){this.dice.push(Math.floor(Math.random()*6+1))}
        this.roll_count++
    }

    this.addplayer = function addplayer(Player) {
        this.players.push(Player)
        console.log(this)
    }

    this.isHost = function isHost(socket) {
        for (i = 0; i < this.players.length; i++) {
            if (socket.id == this.players[i].id) {
                return true
            }
            return false
        }
    }
    this.isWon = function isWon(game) {
        return game.players.map(player => player.score).findIndex((score) => score > winscore)
    }

    this.Bank = function Bank(socket) {
        console.log(this)
        if (socket.id == this.players[this.turnindex].id && this.started == true) {
            this.players[this.turnindex].score += () => {
                if (ofakind(6, this.dice)[0]) {
                    return 3000
                }
                if (ofakind(5, this.dice)[0]) {
                    return 2000
                }
                if (ofakind(4, this.dice)[0]) {
                    return 1000
                }
                if (ofakind(3, this.dice)[0]) {
                    return ofakind(3, dice)[1] * 100
                }
                return 0
            }
        }

    }
}
    module.exports = game;