'use-strict';

/* variables used throughout */
/*  The radius in meters that the player should be able to get the 
    shadowCaster challenge (+- 50 meters) */
var radius = 300; 
var map; 
var watchKey; 
var userMarker;
var circle;  
/*  These shadowCasters will call the challenges from the challengers list.
    Because the challenges must be scanned in the the JS engine first,
    at the very end of the index.html, there is a addChallenges JS file
    Thus, you can arrange what challenges you want for each SC below. 
    This is tentative the solution until modules may be added. */
var shadowCasters = 
[
    {
        /*startChallenge: startBinaryChallenge,*/
        pos: {
            lat: 35.306319,
            lng: -120.659265
            
        }
    },
    {
        /* startChallenge: startBinaryChallenge,*/
        pos: {
            lat: 35.299307,
            lng: -120.655827,
        }   
    }
]


var challenges = [];

var shadowCasterMarkers = [];
var circleTimeOut = setTimeout(()=>{},0); 
var initLocation = {lat: 36.761963699999995, lng: -119.73101000000001};


/* Call this function to show and track user on the map. */
function showAndTrackUser(){
    
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
        map.panTo(pos);
        /*  If userMarker does not exist (will be null if it 
            doesn't), create one */
        if (! userMarker){
            userMarker = new google.maps.Marker({
            position: pos, 
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
        } else {
            /*  Otherwise, change the position of it */
            userMarker.setPosition(pos);
        } 
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
    /* This is the function to load the shadowCasters in */
    function load(){
        /*  A Google Maps Circle object to be around the shadowCaster
            to show its acceptible click radius. If player is already 
            within the click radius, it will not show blue circle. Instead,
            it will show the challenge per that shadowCaster */
        circle = new google.maps.Circle({
            strokeColor: 'white',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'black',
            fillOpacity: 0.35,
            map: null,
            center: initLocation,
            radius: radius
          });
        
        /*  For loop creating shadowCaster Google Map Markers and adding 
            click listeners to show click radius / bring up challenge */
        for(let i = 0; i < shadowCasters.length; i ++){
            let shadowCasterMarker =  new google.maps.Marker(
                {
                    position: shadowCasters[i].pos, 
                    map: map,
                    /*  Upon load, shadowCaster will "drop" onto the map. 
                        See API for further details/*/
                    animation: google.maps.Animation.DROP,
                    /* Icon for shadowCaster marker. See API for further details.*/
                    icon: new google.maps.MarkerImage("./images/mvp.png"),
                    /* This needs to be set to false to allows for gif's to show */
                    optimized: true
                });
            /*  This adds the click event to each shadowCaster.
                shadowCasterClicked needs to be called for each shadowCaster, 
                so bind is called to pass in the shadowCaster argument. This could
                be easily solved with a class/ prototype.    
            */
            shadowCasterMarker.addListener("click", shadowCasterClicked.bind(this, shadowCasterMarker, i));
            shadowCasterMarkers.push(shadowCasterMarker);
        }
    }
    
    function isFarAway(shadowCasterMarker){
        /* To do */
        var distance = getDistance(userMarker.getPosition(), shadowCasterMarker.getPosition());
        return distance > radius;
    }

    /*  This is called whenever each shadowCaster clicked 
        If it is too far awya, it will show a click radius.
        Otherwise, it will bring up the respective challenge.
    */
    function shadowCasterClicked(shadowCasterMarker, i){
        if (isFarAway(shadowCasterMarker)){
            circle.setCenter(shadowCasterMarker.getPosition());
            circle.setMap(map);
            setCircleTimeOut();
        } else {
            getChallenge(i);
        }
    }

    /*  On each shadowCaster click (that is too far away), the circle 
        should only show for X seconds. This function handles that.
        Also, if you jump around clicking other shadowCasters, it will
        reset the timer for displaying the circle. */
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
    load();
}

/*  Gets respective shadowCaster challenge */
function getChallenge(i){
    /* To do */
    challenges[i]();
}

/*  Shows map on the div w/ id of "map" */
function showMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: initLocation,
        zoom: 13
      });
}

/* Main */
function main() {
    showMap();
    showAndTrackUser();
    loadShadowCasters();
  }

/* Grabs the distance in meters from one Google pos to another */
function getDistance(pos1, pos2) {
    var lat1 = pos1.lat();
    var lon1 = pos1.lng();

    var lat2 = pos2.lat();
    var lon2 = pos2.lng();

    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        /* Conversion to km */
        dist = dist * 1.609344 ;
        /* Conversion to m */
        dist = dist * 1000;
        return dist; 
    }
}
