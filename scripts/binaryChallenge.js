'use-strict';
function startBinaryChallenge(){
    $('<div class="row"> <div class="col"> </div> <div class="col-8 binaryColWrapper" > <span class="binaryCircle"> <i class="fas fa-circle"></i> </span> <span class="binaryCircle"> <i class="fas fa-circle"></i> </span> <span class="binaryCircle"> <i class="fas fa-circle"></i> </span> <span class="binaryCircle"> <i class="fas fa-circle"></i> </span> <span class="binaryCircle"> <i class="fas fa-circle"></i> </span> <span class="binaryCircle"> <i class="fas fa-circle"></i> </span> <span class="binaryCircle"> <i class="fas fa-circle"></i> </span> <span class="binaryCircle"> <i class="fas fa-circle"></i> </span> </div> <div class="col"> </div> </div>').appendTo('#challenge');
    /* Init Game */
    var mapDOM = document.getElementById("map");
    var challengeDOM = document.getElementById("challenge");
    changeDisplay();

    /*  At any given moment, the map OR challenge should be 
        displayed. This function flips which are displayed. 
    */ 
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

