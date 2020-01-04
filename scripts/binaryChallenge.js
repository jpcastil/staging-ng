'use-strict';


function startBinaryChallenge(){
    addHTML('<p id="number" class="text-center"></p> <div class="row"> <div class="col"> </div> <div class="col-12 col-md-8 binaryColWrapper" > <span id="circle7" > <i class="fas fa-circle" ></i> </span> <span id="circle6" > <i class="fas fa-circle" ></i> </span> <span id="circle5" > <i class="fas fa-circle" ></i> </span> <span id="circle4" > <i class="fas fa-circle" ></i> </span> <span id="circle3" > <i class="fas fa-circle" ></i> </span> <span id="circle2" > <i class="fas fa-circle" ></i> </span> <span id="circle1" > <i class="fas fa-circle" ></i> </span> <span id="circle0" > <i class="fas fa-circle" ></i> </span> </div> <div class="col"> </div> </div>');
    changeDisplay();
    generateRandomNumber();

    var onColor = "red";
    var randomNumber;
    var value = 0;
    /* Binary values */
    var binVals = [1, 2, 4, 8, 16, 32, 64, 128];
    /* Selectors for jQuery */
    var selectors = ["#circle0 i", "#circle1 i", "#circle2 i", "#circle3 i", "#circle4 i", "#circle5 i", "#circle6 i", "#circle7 i"];
    /* Ids for DOM manipulation */
    var ids = ["circle0", "circle1", "circle2", "circle3", "circle4", "circle5", "circle6", "circle7"];
    /* False = black (off), True = red (on) */
    var colors = [false, false, false, false, false, false, false, false]
    
    /* Attaches a click event listener to each Circle */
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).addEventListener("click", clickedCircle.bind(this, i));
    }
    
    /*  Click listener. Toggles color, adds/ subtracts binary value, and checks 
        if user is complete */
    function clickedCircle(index) {
        toggleColor(index);
        toggleValue(index);
        isComplete();
    }
    
    /*  Toggles color */
    function toggleColor(index) {
        var newColor = colors[index] ? "white" : onColor;
        colors[index] = !colors[index];
        $(selectors[index]).css("color", newColor);
    }
    
    /* Adds/ Subtracts value depending if user turned the circle on/off */
    function toggleValue(index) {
        var sign = colors[index] ? 1 : -1;
        value += (sign * binVals[index]);
    }
    
    /* Generates a number from 1 to 255 */
    function generateRandomNumber() {
        randomNumber = Math.floor((Math.random() * 255) + 1);
        $("#number").text(randomNumber);
    };
    
    /* Gets if the value is equal to the originally made random Number */
    function isComplete() {
        if (randomNumber === value) {
            challengeCompleted();
        };
    }
    
    function challengeCompleted() {
        alert("Congrats! You know how to count binary!!");
        changeDisplay();
    }
    
}

