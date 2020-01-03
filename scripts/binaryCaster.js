'use-strict';
function startBinaryCaster(){
    /* Init Game */
    var mapDOM = document.getElementById("map");
    var challengeDOM = document.getElementById("challenge");
    changeDisplay();

    function changeDisplay(){
        if (mapDOM.style.display === "none"){
            mapDOM.style.display = "block";
            challengeDOM.style.display = "none";
        } else {
            mapDOM.style.display = "none";
            challengeDOM.style.display = "block";
        }
    }
    
    
}

