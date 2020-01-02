'use-strict';
/* Have to call this first to use Google API */
/* variables used throughout */
var map; 
var watchKey; 
var userMarker;
var circle;  
var shadowCasters = 
[
    {
        lat: 36.7650999,
        lng: -119.7375864  
    },
    {
        lat: 36.764669,
        lng: -119.728304
    }
]
var shadowCasterMarkers = []
var circleTimeOut = setTimeout(()=>{},0); 
var initLocation = {lat: 36.761963699999995, lng: -119.73101000000001};
/* Geolocation */
function showMapAndUser(){
    
    const options = {
        enableHighAccuracy: true,
        timeout: 1000 * 5,
        maximumAge: 0
    }
    function success(position){
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        if (map){
            map.panTo(pos);
            if (! userMarker){
                userMarker = new google.maps.Marker({
                    position: pos, 
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#4090e4",
                        strokeColor: "#ffff",
                        strokeWeight: 1,
                        fillOpacity: 1
                      }
                    /*icon: './images/dot.png'*/
                });
            } else {
                userMarker.setPosition(pos);
            }  
        }
    }
    function error(error){
        var message = "Problem with Geolocation. " + error.message;
        alert(message);
    }
    /* If geolocation enabled, GEO will be an object */
    if (navigator.geolocation){
        watchKey = navigator.geolocation.watchPosition(success, error, options); 
    } else {
        alert("Browser does not support Geolocation.");
    }
}


function loadShadowCasters(){
    function load(){
        circle = new google.maps.Circle({
            strokeColor: 'white',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'blue',
            fillOpacity: 0.35,
            map: null,
            center: initLocation,
            radius: 300
          });

        for(let i = 0; i < shadowCasters.length; i ++){
            let shadowCasterMarker =  new google.maps.Marker(
                {
                    position: shadowCasters[i], 
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: "./images/cube.gif",
                    optimized: false
                });
            shadowCasterMarker.addListener("click", shadowCasterClicked.bind(this, shadowCasterMarker));
            shadowCasterMarkers.push(shadowCasterMarker);
        }
    }
    function isFarAway(){
        /* To do */
        return true;
    }
    function shadowCasterClicked(shadowCasterMarker){
        if (isFarAway()){
            circle.setCenter(shadowCasterMarker.getPosition());
            circle.setMap(map);
            setCircleTimeOut();
        }
    }
    function setCircleTimeOut(){
        if (! circleTimeOut._called){
            clearTimeout(circleTimeOut);
        }
        circleTimeOut = setTimeout(function removeCircle(){
            if (circle.getMap()){
                circle.setMap(null);
            }
        }, 1000 * 3);
    }

    /* Waits in order to make sure make exists */
    setTimeout(load, 1000 * 3);
}

function getChallenge(){

}

/* Main */
function main() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: initLocation,
      zoom: 15
    });
    showMapAndUser();
    loadShadowCasters();
  }

