
import {socket} from './main.js'

document.getElementById('joinBtn').addEventListener()

export function isTrue(){
    return true
}

export function nameModal(show) {
    if (show) {
        document.getElementById("joinModal").style.display = "block";
        document.getElementById("Master").style.filter = "blur(5px)";
    } else {
        document.getElementById("joinModal").style.display = "none";
        document.getElementById("Master").style.filter = "none";
    }
}