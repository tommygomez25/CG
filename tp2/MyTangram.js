import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.redTriangle = new MyTriangleSmall(scene);
        this.purpleTriangle = new MyTriangleSmall(scene);
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.pinkTriangle = new MyTriangle(scene);
        this.blueTriangle = new MyTriangleBig(scene);
        this.orangeTriangle = new MyTriangleBig(scene);
	}
	
	display(){
        
        /* RED TRIANGLE */

        this.scene.pushMatrix();

        this.scene.translate(-2.67, 1.82, 0);

        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        
        this.redTriangle.display()

        this.scene.popMatrix();

        /* PURPLE TRIANGLE */

        this.scene.pushMatrix();

        this.scene.translate(-0.63, 1.82, 0);

        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.purpleTriangle.display();

        this.scene.popMatrix();

        /* DIAMOND */

        this.scene.pushMatrix();

        this.scene.translate(-1.65, 0.8, 0);

        this.diamond.display();

        this.scene.popMatrix();

        /* PARALLELOGRAM */

        this.scene.pushMatrix();

        this.scene.translate(Math.sqrt(2), Math.sqrt(2), 0);

        this.scene.rotate(Math.PI/4, 0, 0, 1);

        this.scene.rotate(-Math.PI, 0, 1, 0);

        this.parallelogram.display();

        this.scene.popMatrix();

        /* PINK TRIANGLE */

        this.scene.pushMatrix();

        this.scene.translate((Math.sqrt(2)) + 0.03, 0, 0);

        this.scene.rotate(-Math.PI/4, 0, 0, 1);

        this.pinkTriangle.display();

        this.scene.popMatrix();

        /* BLUE TRIANGLE */

        this.scene.pushMatrix();

        this.scene.translate((Math.sqrt(2)) + 0.06, -0.58, 0);

        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        
        this.blueTriangle.display();

        this.scene.popMatrix();

        /* ORANGE TRIANGLE */

        this.scene.pushMatrix();

        this.scene.translate(2.09, -2, 0);

        this.scene.rotate(5*Math.PI/4, 0, 0, 1);

        this.orangeTriangle.display()

        this.scene.popMatrix();
    }

}

