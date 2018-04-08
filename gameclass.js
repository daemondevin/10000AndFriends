function game(Name){
    this.Name=Name
    this.players=[]
    this.messages=[]
    this.started=false

    this.addplayer=function addplayer(Player){
        this.players.push(Player)
        console.log(this)
    }

   
    //nsp.on('connection',this.addplayer(socket))
}

module.exports=game;
