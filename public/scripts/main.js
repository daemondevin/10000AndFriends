var socket = io(window.location.pathname);
console.log(window.location.pathname,socket)
function rand(){return Math.floor(Math.random()*6+1)}

function roll(){
    var changes=0;
    var interval=window.setInterval(function(){
        changes++
        if(changes>30){window.clearInterval(interval)}
    for (i=0;i<6;i++){
        dice[i]=rand()
        //console.log('d'+(i+1),dice[i])
        document.getElementById('d'+(i+1)).innerHTML=dice[i]
    }},100
    )
}

function sendmsg(){
    socket.emit('msg',document.getElementById('chatmessage').value)
    document.getElementById('chatmessage').value=""
}
socket.on('msg',function(msg){console.log(msg)
    let chatlog=document.getElementById('chatlog');
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(msg))
    //to do: rewrite this so on a new message coming in we make a new <li>
    chatlog.appendChild(li)
})
socket.on('connection',console.log('Newconnections'))
var dice =[rand(),rand(),rand(),rand(),rand(),rand()]