var socket = io(window.location.pathname);
console.log(window.location.pathname, socket)
//console.log(document.getElementsByClassName('modalBG')[0].style.filter="blur(9px)"/*[0].style.filter/*.style.filter*/)

function nameModal(show){
    if(show){
        document.getElementById("joinModal").style.display="block";
        document.getElementById("Master").style.filter="blur(5px)";}
    else{
        console.log("hide")
        document.getElementById("joinModal").style.display="none";
        document.getElementById("Master").style.filter="none";
    }
}

nameModal(true);

function rand() {
    return Math.floor(Math.random() * 6 + 1)
}

function roll() {
    var changes = 0;
    var interval = window.setInterval(function () {
        changes++
        if (changes > 30) {
            window.clearInterval(interval)
        }
        for (i = 0; i < 6; i++) {
            dice[i] = rand()
            //console.log('d'+(i+1),dice[i])
            document.getElementById('d' + (i + 1)).innerHTML = dice[i]
        }
    }, 100)
}

function gamestart(){
    socket.emit('GameStart')
}

function sendmsg() {
    socket.emit('msg', document.getElementById('chatmessage').value)
    document.getElementById('chatmessage').value = ""
}
socket.on('msg', function (msg) {
    console.log(msg)
    let chatlog = document.getElementById('chatlog');
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(msg.sender+": "+msg.msg))
    //to do: rewrite this so on a new message coming in we make a new <li>
    chatlog.appendChild(li)
})
socket.on('connection', console.log('Newconnections'))

function join(playername) {
    socket.emit('playerjoin', {name:playername});
    nameModal(false)
}
socket.on('playerupdate',(players)=>{
    console.log(players)
    let playerlist=document.getElementById('PlayerList');
    for (i=0;i<players.length;i++){
    console.log(players[i])
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(players[i].name+" "+players[i].score))
    playerlist.appendChild(li)}
})

var dice = [rand(), rand(), rand(), rand(), rand(), rand()]