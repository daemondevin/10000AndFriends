
//import {socket} from './main.js'

export function nameModal(show) {
    if (show) {
        document.getElementById("joinModal").style.display = "block";
        document.getElementById("Master").style.filter = "blur(5px)";
    } else {
        document.getElementById("joinModal").style.display = "none";
        document.getElementById("Master").style.filter = "none";
    }
}

export function playerdisconnect(player){
    document.getElementsByClassName('modalBox')[0].innerHTML=
    "Sorry.... it looks "+
    player.name+
    " lost connection and currently that"+
    " means this game is over.  You will be re-routed to the lobby in a moment."
    document.getElementById("joinModal").style.display = "block";
    document.getElementById("Master").style.filter = "blur(5px)";
    window.setTimeout(()=>{window.location.href = '../'},1000*5)
}