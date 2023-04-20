import { CGFobject } from '../../lib/CGF.js';
import { MyPyramid } from '../primitives/MyPyramid.js';

export class MyBirdTail extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance) {
    super(scene);

    this.tail = new MyPyramid(this.scene, 4, 15);
    this.appearance = appearance;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(2.2,0.0, 0.0);
    this.scene.scale(0.5,0.3,0.3)
    this.scene.rotate(-Math.PI/2, 0,0,1)
    this.appearance.apply();
    this.tail.display();
    this.scene.popMatrix();
  }



}