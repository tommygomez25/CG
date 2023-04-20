import { CGFobject } from '../../lib/CGF.js';
import { MyPyramid } from '../primitives/MyPyramid.js';
import { MyTriangle } from '../primitives/MyTriangle.js';

export class MyBirdTail extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance) {
    super(scene);

    this.one_tail = new MyTriangle(this.scene)
    this.two_tail = new MyTriangle(this.scene)
    this.appearance = appearance;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(2.8,0.0, -0.25);
    this.scene.scale(1.2,0.5,0.5)
    this.scene.rotate(-Math.PI/12, 0,1,0)
    this.appearance.apply();
    this.one_tail.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.8,0.0, 0.25);
    this.scene.scale(1.2,0.5,0.5)
    this.scene.rotate(Math.PI/12, 0,1,0)
    this.scene.rotate(Math.PI, 1,0,0)
    this.appearance.apply();
    this.two_tail.display();
    this.scene.popMatrix();
  }



}