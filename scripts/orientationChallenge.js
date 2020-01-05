'use-strict';


function startOrientationChallenge(){
    (function init(){
        addHTML('<div class="row"> <div class="col"> </div> <div class="col-6"> <p class="text-center" id="oc-text"> A circle that sees controls me <br /><br /> At times you use me watch Can’t fit them all? See me <br /><br /> Unforeseen, I sometimes be But fear not, just lean <br /><br /> You seek the key, I see It’s easy. Don’t be so weighty To land, you must bring me You ask: To what degree? <br /><br /> Make width larger than height Hold it. Only then, shall you see me </p> </div> <div class="col"> </div> </div>');
        changeDisplay();
        orientationChanged();
      })();

      /* Adds event listener for orientation changes. */
      window.addEventListener("orientationchange", orientationChanged);

      /*  Checks if device is in landscape mode. 90 / -90 === landscape. On mobile devices,
          it may be that you can only ever be in portrait OR landscape, so it can be 
          window.orientation != 0, but just to be safe. */
      function isOrientationLandscape(){
        return window.orientation === 90 || window.orientation === -90
      }

      /* Callback function for orientation changed event handler */
      function orientationChanged(){
        if (isOrientationLandscape()){
          isComplete();
        }
      }
      
      /* function to be called if challenge is solved */
      function isComplete(){
        alert("Now you see me");
        changeDisplay();
      }
}