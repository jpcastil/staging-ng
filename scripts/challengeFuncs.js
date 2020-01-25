'use-strict';

/*  At any given moment, the map OR challenge should be 
    displayed. This function flips which are displayed. 
    */ 
export function changeDisplay(){
    var mapDOM = document.getElementById("map");
    var challengeDOM = document.getElementById("challenge");
    
    if (mapDOM.style.display === "none"){
        mapDOM.style.display = "block";
        challengeDOM.style.display = "none";
    } else {
        mapDOM.style.display = "none";
        challengeDOM.style.display = "block";
    }
}

/*  Appends HTML to #challenge id
    This will be called on every challenge init. The HTML for which 
    will be injected with jQuery here. */
export function addHTML(html){
    $(html).appendTo('#challenge');
}

/*  Clears HTML of #challenge id
    This will be called on every challenge completion. If not called, 
    the #challenge id will hold the previous challenge as well as the 
    new one */
export function clearHTML(){
    const challenge = document.getElementById("challenge");
    challenge.innerHTML = '';
}