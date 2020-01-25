'use strict';

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    printX(){
        console.log(this.x)
    }
    printGraph(){
        console.log(this.graph);
    }
}

Point.prototype.graph = "The global graph";

var point0 = new Point(3,4);
