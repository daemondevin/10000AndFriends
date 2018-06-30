

function ofakind(eval, dice) {
    //debugger
    for (let i = 1; i<7; i++) {
        if (dice.filter((n) => {
                return n == i
            }).length == eval) {
            return [true, i]
        } 
    }
    return [false]
}
/*the idea of this function is that we start checking the dice for the highest scoring roll conditions first, then we run re-run the 
functions with the dice used in the first conditon filtered out till no more condtions are met and return the score.  Pretty proud of
this idea, writing it down here so I remember what I was thinking.
*/
function Score(dice, score) {
    //debugger
    //console.log('score:',dice, score)
    if (ofakind(6, dice)[0]) {
        score += 3000
        return score
    }
    if (ofakind(5, dice)[0]) {
        score += 2000
        return Score(dice.filter(x => x != ofakind(5, dice)[1]), score)
    }
    if (ofakind(4, dice)[0]) {
        score += 1000
        //console.log(ofakind(4, dice)[1])
        return Score(dice.filter(x => x != ofakind(4, dice)[1]), score)
    }
    if (ofakind(3, dice)[0]) {
        //this needs work, maybe try to fit the 2 triplets condition into here
        //console.log("3 of a kind!")
        score += ofakind(3, dice)[1] * 100
        return Score(dice.filter(x => x != ofakind(3, dice)[1]), score)
    }
    if (dice.filter(x => {return x == 1 || x==5;}).length > 0) {
        //console.log(score)
        score += dice.filter(x => x == 1).length * 100+dice.filter(x=>x==5).length*50
        //console.log(score)
        //console.log(dice.filter(x => {return x != 1 || x != 5;},score))
        return Score(dice.filter(x => {return x != 1 && x != 5;}),score)
        
    }
    return score
}
//console.log(Score([1,1,1,5,5,3], 0))


const winscore = 100

function game(Name) {
    this.Name = Name
    this.players = []
    this.messages = []
    this.started = false;
    this.turnindex = 0;
    this.fistconnection = false;
    this.turn = {
        roll_count: 0,
        score: 0
    }

    this.dice = new Array(6).fill({
        value: 0,
        avalible: true
    }, 0, 6)
    //debugger
    this.diceindex = []

    this.nextturn = function nextturn() {
        this.turnindex = (this.turnindex + 1) % this.players.length
        this.dice.fill({
            value: null,
            avalible: true
        }, 0, 6)
        this.turn.roll_count=0;
        this.turn.score=0
    }

    this.roll = function (index) {
        //debugger
        console.log("Index: ",index)
        for (let i = 0; i < index.length; i++) {
    
            //console.log(i,index[i],this.dice[index[i]].value,Math.floor(Math.random()*6+1))
            this.dice[index[i]] = {
                value: Math.floor(Math.random() * 6 + 1),
                avalible: this.dice[index[i]].avalible
            } //.value=Math.floor(Math.random()*6+1)

        }
        //debugger
        var scoreddice =[]
        //set all the dice not in the index to unavalible
        for (let i=0;i< 6;i++){
            if (index.includes(i)==false){
                console.log('I should be false for ',i)
                if(this.dice[i].avalible==true){
                    scoreddice.push(this.dice[i].value)
                    this.dice[i].avalible=false;
                }
                
            }
        } 
        //debugger
        console.log(Score(scoreddice.map(y => y.value),0))
        this.turn.score+=Score(scoreddice,0)

        console.log(this.turn.score)
        /*if (!index.some(x => {
                this.dice[x].avalible == false
            })) {
            console.log('one of these dice should not be avalible')
        }*/
        console.log('112',this.dice.filter(x => {return x.avalible==true}).map(y=>y.value),Score(this.dice.filter(x => {return x.avalible==true}).map(y=>y.value),0))
        if(Score(this.dice.filter(x => {return x.avalible==true}).map(y=>y.value),0)==0){
            //farkle occured
            console.log('farkle')
            this.turn.score=0
            this.nextturn()
            return false
        }
        console.log(this.dice)
        this.roll_count++
        return true
       // debugger
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
            this.players[this.turnindex].score = this.players[this.turnindex].score + this.turn.score + Score(this.dice.filter(x => {return x.avalible==true}).map(y=>y.value),0)
            this.turn.score=0;
            console.log(this.players)
        }
        this.nextturn()

    }
}
module.exports = game;

