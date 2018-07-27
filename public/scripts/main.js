import {nameModal,playerdisconnect} from './modal.js'
//establish a socket connection to the server
var socket = io(window.location.pathname);

//Show the nameModal to allow users entering the room to give themselves a name.
nameModal(true);
diceEventListeners();


function displayButton(id, show) {
    if (show) {
        document.getElementById(id).style.display = "inline-block";
    } else {
        document.getElementById(id).style.display = "none"
    }
}


function rand() {
    return Math.floor(Math.random() * 6 + 1)
}

function rollanim(dice) {
    for(let i =0;i<=5;i++){
        if(dice[i].avalible){
            document.getElementById('d'+(i)).style.backgroundColor='white'
        }
        else{
            document.getElementById('d'+(i)).style.backgroundColor='grey'
        }
    }
    var changes = 0;
    var interval = window.setInterval(function () {
        changes++

        for (let i = 0; i <= 5; i++) {
            if(dice[i].avalible){
                document.getElementById('d' + (i)).setAttribute('src','/img/dice'+rand()+'.svg')
            }
        }
        if (changes > 30) {
            for (let i = 0; i <= 5; i++) {
                //let diceElem = document.createElement('svg')
                //diceElem.setAttribute('src','/img/dice'+dice[i].value+".svg")

                document.getElementById('d' + (i)).setAttribute('src','/img/dice'+dice[i].value+'.svg')
        
            }
            window.clearInterval(interval)
        }
    }, 100)

}

function gamestart() {
    socket.emit('GameStart')
    document.getElementById('GameStart').style.display='none'
}

function roll(dice) {
    socket.emit('roll', dice)
}

function Bank() {
    socket.emit('bank')
}

function sendmsg() {
    socket.emit('msg', document.getElementById('chatmessage').value)
    let chatlog = document.getElementById('chatlog');
    let li = document.createElement('li');
    li.appendChild(document.createTextNode('You: '+document.getElementById('chatmessage').value))
    chatlog.appendChild(li)
    document.getElementById('chatmessage').value = ""
}
socket.on('msg', function (msg) {
    console.log(msg)
    let chatlog = document.getElementById('chatlog');
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(msg.sender + ": " + msg.msg))
    //to do: rewrite this so on a new message coming in we make a new <li>
    chatlog.appendChild(li)
})
socket.on('connection', console.log('Newconnections'))

function join(playername) {
    socket.emit('playerjoin', {
        name: playername
    });
    nameModal(false)
}
socket.on('playerupdate', (players,turnindex) => {
    //in production app we should NOT share socket ID's
    document.getElementById('PlayerList').innerHTML = "";
    console.log(players)
    if (players.filter((player) => player.host)[0].id == socket.id) {
        console.log('player is host!')
        displayButton('GameStart', true)
    }
    let playerlist = document.getElementById('PlayerList');
    for (let i = 0; i < players.length; i++) {
        console.log(players[i])
        let li = document.createElement('li');
        let name = document.createElement('div');
        let score = document.createElement('div');

        li.appendChild(name);
        li.appendChild(score);
        if(i==turnindex){
        name.innerHTML = ">"+players[i].name
        }
        else{
        name.innerHTML = players[i].name}
        score.innerHTML = players[i].score
        name.setAttribute('id', 'PlayerListName')
        score.setAttribute('id', 'PlayerListScore')

        playerlist.appendChild(li)
    }
})

socket.on('newturn', (player) => {

    ismyturn= player.id==socket.id
    if(ismyturn){
        diceindex = [0, 1, 2, 3, 4, 5];
    }
    displayButton('RollBtn', player.id == socket.id)
    displayButton('Bank', player.id == socket.id)

})
socket.on('roll_Return', function (dice) {
    console.log(dice);
    rollanim(dice)
})
socket.on('playerDisconect', function (player){
    playerdisconnect(player);
})


var local_dice = [rand(), rand(), rand(), rand(), rand(), rand()]
var diceindex = [0, 1, 2, 3, 4, 5];
var ismyturn = false;

document.getElementById('joinBtn').addEventListener('click', function () {
    join(document.getElementById('playername').value)
})
document.getElementById('GameStart').addEventListener('click',function(){gamestart()})
document.getElementById('RollBtn').addEventListener('click',function(){socket.emit('roll', diceindex)})
document.getElementById('Bank').addEventListener('click',function(){Bank()})

//For sending Chat mesages
document.getElementById('sendChatMsg').addEventListener('click',function(){sendmsg()})

function diceEventListeners() {
    for (let i = 0; i < document.getElementsByClassName('dice').length; i++) {
        console.log('adding listener to '+i+' dice')
        document.getElementsByClassName('dice')[i].addEventListener('click', function () {
            if(ismyturn){
            if (diceindex.includes(i)) {
                diceindex = diceindex.filter(j => j != i)
                document.getElementById('d' + i).style.backgroundColor = 'grey'

            } else {
                diceindex.push(i)
                document.getElementById('d' + i).style.backgroundColor = 'white'
            }}
        })
    }
}


