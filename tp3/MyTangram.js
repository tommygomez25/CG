import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from '../tp2/MyDiamond.js';
import { MyParallelogram } from '../tp2/MyParallelogram.js';
import { MyTriangleBig } from '../tp2/MyTriangleBig.js';
import { MyTriangleSmall } from '../tp2/MyTriangleSmall.js';
import { MyTriangle } from '../tp2/MyTriangle.js';
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
        this.initTangramMaterials();
	}   

    initTangramMaterials() {
        // red material
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(...this.scene.hexToRgbA('#ff0000'))
        this.redMaterial.setDiffuse(0, 0, 0, 1)
        this.redMaterial.setSpecular(...this.scene.hexToRgbA('#ff0000'))
        this.redMaterial.setShininess(10.0)

        // purple material
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(...this.scene.hexToRgbA('#800080'))
        this.purpleMaterial.setDiffuse(0, 0, 0, 1)
        this.purpleMaterial.setSpecular(...this.scene.hexToRgbA('#800080'))
        this.purpleMaterial.setShininess(10.0)

        // pink material
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(...this.scene.hexToRgbA('#ffc0cb'))
        this.pinkMaterial.setDiffuse(0, 0, 0, 1)
        this.pinkMaterial.setSpecular(...this.scene.hexToRgbA('#ffc0cb'))
        this.pinkMaterial.setShininess(10.0)

        // orange material
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(...this.scene.hexToRgbA('#ffa500'))
        this.orangeMaterial.setDiffuse(0, 0, 0, 1)
        this.orangeMaterial.setSpecular(...this.scene.hexToRgbA('#ffa500'))
        this.orangeMaterial.setShininess(10.0)

        // blue material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(...this.scene.hexToRgbA('#0000ff'))
        this.blueMaterial.setDiffuse(0, 0, 0, 1)
        this.blueMaterial.setSpecular(...this.scene.hexToRgbA('#0000ff'))
        this.blueMaterial.setShininess(10.0)

        // yellow material
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(...this.scene.hexToRgbA('#ffff00'))
        this.yellowMaterial.setDiffuse(0, 0, 0, 1)
        this.yellowMaterial.setSpecular(...this.scene.hexToRgbA('#ffff00'))
        this.yellowMaterial.setShininess(10.0)


    }
	
	display() {

        // red Triangle
        this.scene.pushMatrix();
        this.scene.translate(-0.75,1.85,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.redMaterial.apply()
		this.redTriangle.display();
        this.scene.popMatrix();

        // purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.8,1.85,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.purpleMaterial.apply()
        this.purpleTriangle.display();
        this.scene.popMatrix();

        //diamond
        this.scene.pushMatrix();
        this.scene.translate(-1.77,0.8,0);
        this.scene.customMaterial.apply()
        this.diamond.display();
        this.scene.popMatrix();

        //parallelogram
        this.scene.pushMatrix();
        this.scene.translate(-1.5,0,0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.rotate(Math.PI,1,0,0);
        this.yellowMaterial.apply()
        this.parallelogram.display();
        this.scene.popMatrix();

        //pink triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2),0,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.pinkMaterial.apply()
        this.pinkTriangle.display();
        this.scene.popMatrix();

        // blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(1.45,-0.6,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.blueMaterial.apply()
        this.blueTriangle.display();
        this.scene.popMatrix();

        // orange tiangle
        this.scene.pushMatrix();
        this.scene.translate(2.05,-2.1,0);
        this.scene.rotate(5*Math.PI/4,0,0,1);
        this.orangeMaterial.apply()
        this.orangeTriangle.display();
        this.scene.popMatrix();
	}

    enableNormalViz() {
        this.redTriangle.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.blueTriangle.enableNormalViz();
        this.orangeTriangle.enableNormalViz();
    }

    disableNormalViz() {
        this.redTriangle.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.blueTriangle.disableNormalViz();
        this.orangeTriangle.disableNormalViz();
    }
}

