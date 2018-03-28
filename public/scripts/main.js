var socket = io(window.location.pathname);
console.log(window.location.pathname)
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
    console.log(document.getElementById('chatmessage').value)
}

var dice =[rand(),rand(),rand(),rand(),rand(),rand()]