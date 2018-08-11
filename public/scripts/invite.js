import {copiedmodal} from './modal.js'

document.getElementById('copyInvite').addEventListener('click',()=>{
    console.log('copy modal opened')
    copiedmodal(true);
    let ta = document.createElement('textarea')
    ta.value = document.location
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta);
    
    setTimeout(function(){
        copiedmodal(false)
    },4000)

})