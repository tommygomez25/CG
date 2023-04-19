import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyBirdEye extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance, side) {
    super(scene);
    this.side = side; //0 is left, 1 is right
    this.eye = new MySphere(this.scene, 30, 15);
    this.appearance = appearance;
  }

  display() {
    this.scene.pushMatrix();
    if(this.side == 0){
        this.scene.translate(-2.0, 2.0, 3.0);
        this.scene.rotate(0, Math.PI/2, 0, 1);
    }
    else{
        this.scene.translate(-2.0, 2.0, -3.0);
        this.scene.rotate(0, Math.PI/2, 0, 1);
    }
    this.appearance.apply();
    this.eye.display();
    this.scene.popMatrix();
  }



}