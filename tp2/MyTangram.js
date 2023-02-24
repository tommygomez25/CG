import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.diamond = new MyDiamond(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
	}   
	
	display() {

        // red Triangle
        this.scene.pushMatrix();
        this.scene.translate(-0.75,1.85,0);
        this.scene.rotate(Math.PI/2,0,0,1);
		this.redTriangle.display();
        this.scene.popMatrix();

        // purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.8,1.85,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.purpleTriangle.display();
        this.scene.popMatrix();

        //diamond
        this.scene.pushMatrix();
        this.scene.translate(-1.77,0.8,0);
        this.diamond.display();
        this.scene.popMatrix();

        //parallelogram
        this.scene.pushMatrix();
        this.scene.translate(-1.5,0,0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.rotate(Math.PI,1,0,0);
        this.parallelogram.display();
        this.scene.popMatrix();

        //pink triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),0,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.pinkTriangle.display();
        this.scene.popMatrix();

        // blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(1.45,-0.6,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.blueTriangle.display();
        this.scene.popMatrix();

        // orange tiangle
        this.scene.pushMatrix();
        this.scene.translate(2.05,-2.1,0);
        this.scene.rotate(5*Math.PI/4,0,0,1);
        this.orangeTriangle.display();
        this.scene.popMatrix();
	}
}

