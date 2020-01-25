'use-strict';

/* challenges */
import startBinaryChallenge from './binaryChallenge.js';
import startOrientationChallenge from './orientationChallenge.js';
/* map */
import mapObj from './map.js';
/* shadowCaster */
import shadowCaster from './shadowCaster.js';

var map; 
var watchKey; 
var initLocation = {lat: 36.761963699999995, lng: -119.73101000000001};
var userMarker; 
var shadowCasterPositions = 
[
    {
        lat: 35.306319,
        lng: -120.659265
    },
    {
        lat: 35.299307,
        lng: -120.655827,
    },
    {
        lat: 36.778759,
        lng: -119.759202,
    },
    {
        lat: 35.2997971,
        lng: -120.6760334,
    }   
]

var panEnabled = true;
var shadowCasters = [];

/*  Call this function to show and track user on the map.
    If trackOrGet is true, it will continusouly track user.
    If it is false, it will return an object with a success, error, and option fields
*/
function showAndTrackUser(){
    /*  User marker init. to initLocation */
    userMarker = new google.maps.Marker({
        position: initLocation, 
        map: map,
        /*  This is the blue icon. See doc. to change it. */
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "red",
            strokeColor: "#ffff",
            strokeWeight: 1,
            fillOpacity: 1
            }});
    /* Options for Geolocation API. See doc. for more. */
    const options = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 0
    }
    /*  Success callback function for Geolocation API. 
        Browser asks for location, waits for it, and then
        calls this function (with position as an argument) */
    function success(position){
        /*  Converting Geolocation posiiton object to a 
            Google position object */
        
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        
        /*  Change the view of the map to center around the new 
            position */
        if (panEnabled){
            map.panTo(pos);
        }
        userMarker.setPosition(pos);
    }

    /*  Error callback function for Geolocation API. 
        Browser asks for location, waits for it, and if it 
        cannot receive it, it then calls this function 
        (with error object as an argument) */
    function error(error){
        var message = "Problem with Geolocation. " + error.message;
        console.log(message);
    }
    /*  If geolocation enabled, GEO will be an object, null otherwise.
        If applicable, this will ask for user permission as well.
    */
   
    if (navigator.geolocation){
        /*  Watches position for changes with success & error callback.
            Options are optional. If highAccuracy enabled the first 
            geolocation retrieval may take a while 
                
            The watchPosition function returns a watchKey to stop watching                
            for positional changes. 
        */
        watchKey = navigator.geolocation.watchPosition(success, error, options); 
    } else {
        alert("Browser does not support Geolocation. Make sure location services are enabled, and give permission to access location. Please contact the administrators for further assistance.");
    }
}

/*  Call this function to load shadowCasters. Customize shadowCasters 
    by changing the shadowCasters variable */
function loadShadowCasters(){
    shadowCaster.prototype.userMarker = userMarker;
    for (let i = 0; i < shadowCasterPositions.length; i ++){
        shadowCasters.push(
            new shadowCaster(shadowCasterPositions[i], map, startBinaryChallenge)
        )
    }
}

/*  Shows map on the div w/ id of "map" */
function showMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: initLocation,
        zoom: 16
      });
    /* When user scrolls around the map, the automatic re-centering is disabled, then enabled in 10 seconds */
    map.addListener('dragstart', function stopPanning(){
        panEnabled = false; 
    });
    map.addListener('dragend', function startPanning(){
        setTimeout(function start(){
            if (userMarker){
                map.panTo(userMarker.getPosition());
            }
        }, 1000 * 10);
    });
}

/* Main */
(function main() {
    showMap();
    showAndTrackUser();
    loadShadowCasters();
})();


