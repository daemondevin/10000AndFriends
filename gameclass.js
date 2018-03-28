function game(Name,nsp){
    
    this.Name=Name
    this.players=[]
    this.messages=[]
    this.started=false

    this.addplayer=function addplayer(Player){
        this.players.push(Player)
        console.log(this)
    }
    this.newconnection=function(socket){
        if(this.started){
            
        }
    }
   
    //nsp.on('connection',this.addplayer(socket))
}

module.exports=game;
