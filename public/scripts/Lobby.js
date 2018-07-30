
import {showrulesmodal} from './modal.js'

document.getElementById('NewGamebtn').addEventListener('click',createnewgame)
function getrooms(){
    //get list of avalible rooms from server api
    fetch('/api/getrooms')
    .then((resp) => resp.json())
    //write a ul of avalible rooms
    .then(function(data){console.log(this,data)
        var gamelist = document.getElementById('gamelist')
        //remover all li from game list
        gamelist.innerHTML=""
        for(let i=0; i<data.rooms.length;i++){
            let li = document.createElement("li");
            let joinbtn =document.createElement("button")
            joinbtn.setAttribute('onclick',"onclick=location.href='/"+data.rooms[i].Name+"'")
            joinbtn.appendChild(document.createTextNode("Join"))
            li.appendChild(document.createTextNode(data.rooms[i].Name))
            li.appendChild(joinbtn)
            gamelist.appendChild(li)
            console.log(data.rooms[i])
    
}})}

function createnewgame(){
    console.log(document.getElementById('NewGameName').value)
    fetch('/api/newgame/'+document.getElementById('NewGameName').value)
    .then(() => getrooms())
    //.then((data) => {console.log('wow')})
}


getrooms()