'use strict';

/*  ASSUMPTIONS : 
    shadowCaster.userMarker exist. 
    shadowCaster.prototype.userMarker MUST exist, and it MUST have a valid position
    shadowCaster instances WILL try to access them via the prototype 
*/

export default class shadowCaster{
    constructor(pos, map, challenge){
        /* Creates a marker */
        this.marker = new google.maps.Marker(
            {
                position: pos, 
                map: map,
                /*  Upon load, shadowCaster will "drop" onto the map. 
                    See API for further details/*/
                animation: google.maps.Animation.DROP,
                /* Icon for shadowCaster marker. See API for further details.*/
                icon: new google.maps.MarkerImage("./images/mvp.png"),
                /* This needs to be set to false to allows for gif's to show */
                optimized: true
            });
        this.pos = pos;
        this.map = map;
        this.startChallenge = challenge;
        /*  circleTimeOut is init. for 0s to not have to deal with edge 
        *   case to init when a SC is first clicked */
        this.circleTimeOut = setTimeout(()=>{},0); 
        /* Anon. fn here to inherit the 'this' to be the shadowCaster, not the marker */
        this.marker.addListener("click", () => this.shadowCasterClicked());
    }

    /*  Returns if the SC is too far away (distance : m) from the user. 
    *   Max. distance is based on the radius of the circle that shows 
    *   the SC click zone.
    */
    isFarAway(){
        var distance = this.getDistance(this.pos, this.userMarker.getPosition());
        return distance > this.circle.getRadius();
    }

    /*  Upon being clicked, it will either show a circle around the SC for X seconds
    *   or it will start the challenge */
    shadowCasterClicked(){
        if (this.isFarAway()){
            this.showCircle();
            this.setCircleTimeOut();
        } else {
            this.startChallenge();
        }
    }

    showCircle(){
        /*  Sets circle around SC */
        this.circle.setCenter(this.pos);
        /*  Sets the map on the circle (effectively showing the circle). If map is null, circle 
        *   is not shown
        */
        this.circle.setMap(this.map);
    }

    setCircleTimeOut(){
        /*  When you click on a SC out of range, a circle will ALWAYS appear 
        *   This fn handles how long that appearance should last.
        *   It will **always** start the timer, but if there 
        *   already exists a timer, it will clear it, and then set a new one.
        */
        if (! this.circleTimeOut._called){
            clearTimeout(this.circleTimeOut);
        }
        this.circleTimeOut = setTimeout(() => {
            if (this.circle.getMap()){
                this.circle.setMap(null);
            }
        }, 1000 * 3);
    }

    getDistance(pos1, pos2) {
        var lat1 = pos1.lat;
        var lon1 = pos1.lng;

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
}

/*  This is the circle that appears around the SC 
*   Map is set to null; It will not appear on the map.
*   The radius is the SC click area. (distance: m)
*/
shadowCaster.prototype.circle = new google.maps.Circle({
    strokeColor: 'white',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: 'black',
    fillOpacity: 0.35,
    map: null,
    center: {lat: 36.761963699999995, lng: -119.73101000000001},
    radius: 1100
});

