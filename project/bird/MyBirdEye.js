import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

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
        this.scene.translate(-0.25, 0.3,0.3);
        this.scene.rotate(Math.PI/4, 0,1, 0);
        this.scene.scale(0.1,0.1,0.1)
    }
    else{
        this.scene.translate(-0.25, 0.3,-0.3);
        this.scene.rotate(-Math.PI/4, 0,1, 0);
        this.scene.scale(0.1,0.1,0.1)
    }
    this.appearance.apply();
    this.eye.display();
    this.scene.popMatrix();
  }



}