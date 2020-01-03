'use-strict';

/*  At any given moment, the map OR challenge should be 
    displayed. This function flips which are displayed. 
    */ 
function changeDisplay(){
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


function addHTML(html){
    $(html).appendTo('#challenge');
}