import {nameModal} from './modal.js'
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
    var changes = 0;
    var interval = window.setInterval(function () {
        changes++

        for (let i = 0; i <= 5; i++) {
            document.getElementById('d' + (i)).innerHTML = rand()
        }
        if (changes > 300) {
            for (let i = 0; i <= 5; i++) {
                document.getElementById('d' + (i)).innerHTML = dice[i].value;
                console.log(dice[i].value)
            }
            window.clearInterval(interval)
        }
    }, 10)

}

function gamestart() {
    socket.emit('GameStart')
}

function roll(dice) {
    socket.emit('roll', dice)
}

function Bank() {
    socket.emit('bank')
}

function sendmsg() {
    socket.emit('msg', document.getElementById('chatmessage').value)
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
socket.on('playerupdate', (players) => {
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
        name.innerHTML = players[i].name
        score.innerHTML = players[i].score
        name.setAttribute('id', 'PlayerListName')
        score.setAttribute('id', 'PlayerListScore')

        playerlist.appendChild(li)
    }
})
socket.on('newturn', (player) => {
    console.log(player.name)
    console.log(document.getElementById('PlayerList').children[0].children[0].innerHTML==player.name)
    for(let i=0;i<document.getElementById('PlayerList').children.length;i++){
        console.log(document.getElementById('PlayerList').children[i].children[0].innerHTML,player.name)
          if(document.getElementById('PlayerList').children[i].children[0].innerHTML==player.name){
              console.log('match')
              document.getElementById('PlayerList').children[i].children[0].innerHTML='>>>'+document.getElementById('PlayerList').children[i].children[0].innerHTML
          }  
    };
    ismyturn= player.id==socket.id
    displayButton('RollBtn', player.id == socket.id)
    displayButton('Bank', player.id == socket.id)
    /*
    thinking about doing this another way
    if (player.id==socket.id){
        diceEventListeners()
        console.log('dice event listeners added')
    }
    else{
        let oldDice = document.getElementById('dicecont');
        let newDice = oldDice.cloneNode(true);
        oldDice.parentElement.replaceChild(newDice,oldDice)
        console.log('dice event listeners removed')
    }
    */
    //document.getElementById('PlayerList').children[0].setAttribute('id', 'PlayerListTurn')
})
socket.on('roll_Return', function (dice) {
    console.log(dice);
    rollanim(dice)
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


