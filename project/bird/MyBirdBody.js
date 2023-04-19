import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyBirdBody extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance) {
    super(scene);

    this.body = new MySphere(this.scene, 30, 15);
    this.appearance = appearance;
  }

  display() {
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.scale(1.3, 0.6, 0.6)
    this.scene.translate(1.0, 0.0, 0.0);
    this.body.display();
    this.scene.popMatrix();
  }



}