import {
    listenEnter
} from './enterkey.js';

document.getElementById('NewGamebtn').addEventListener('click', createnewgame)



function createnewgame() {
    
    fetch('/api/newgame/')
        .then((resp) => {
            return resp.json()
        }).then((data) => {
            console.log(data);
            window.location.href = window.location+data.Name
            
        })
    //.then((data) => {console.log('wow')})
}



listenEnter('NewGameName', createnewgame)