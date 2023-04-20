import { CGFobject } from '../../lib/CGF.js';
import { MyTriangle } from '../primitives/MyTriangle.js';
import { MyPlane } from '../MyPlane.js';


export class MyBirdWing extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance,side) {
    super(scene);
    this.wingPlane = new MyPlane(scene,30)
    this.wingTriangle = new MyTriangle(scene);
    this.appearance = appearance;
    this.side = side;
  }

  display() {
    this.scene.pushMatrix();
    
    if (this.side == 0) {
      this.scene.translate(1.2, 0.3, 1.0);
      this.scene.rotate(-Math.PI/2 - Math.PI/10, 1, 0,0)
    }
    else {
      this.scene.translate(1.2,0.3, -1.0);
      this.scene.rotate(-Math.PI/2 + Math.PI/10, 1, 0,0)
    }    
    this.appearance.apply();
    this.wingPlane.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();

    if (this.side == 0) {
        this.scene.translate(1.7, -0.05, 2.34)
        this.scene.rotate(Math.PI/6, 1, 0,0)
        this.scene.rotate(Math.PI, 0, 1,0)
    }
    else {
        this.scene.translate(0.7, 0.45, -1.47)
        this.scene.rotate(-Math.PI/6, 1, 0,0)
        this.scene.rotate(Math.PI/2, 0, 1,0)
    }
    this.appearance.apply();
    this.wingTriangle.display();
    this.scene.popMatrix();

  }



}