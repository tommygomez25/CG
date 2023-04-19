<<<<<<< HEAD
import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

export class MyBirdHead extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance) {
    super(scene);

    this.head = new MySphere(this.scene, 30, 15);
    this.appearance = appearance;
  }

  display() {
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.scale(0.5, 0.5, 0.5)
    this.head.display();
    this.scene.popMatrix();
  }



=======
import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyBirdHead extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance) {
    super(scene);

    this.head = new MySphere(this.scene, 30, 15);
    this.appearance = appearance;
  }

  display() {
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.scale(5.0, 5.0, 5.0)
    
    this.head.display();
    this.scene.popMatrix();
  }



>>>>>>> 114ccd77442d27100c585f7492fc7184916f5643
}