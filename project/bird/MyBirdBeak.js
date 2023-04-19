<<<<<<< HEAD
import { CGFobject } from '../../lib/CGF.js';
import { MyPyramid } from '../primitives/MyPyramid.js';


export class MyBirdBeak extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance) {
    super(scene);
    this.beak = new MyPyramid(this.scene, 4, 15);
    this.appearance = appearance;
  }

  display() {
    this.scene.pushMatrix();

    this.scene.translate(-0.5,0.0, 0.0);
    this.scene.scale(0.25,0.1,0.1)
    this.scene.rotate(Math.PI/2, 0,0,1)

    this.appearance.apply();
    this.beak.display();

    this.scene.popMatrix();
  }



=======
import { CGFobject } from '../../lib/CGF.js';
import { MyPyramid } from '../MyPyramid.js';


export class MyBirdBeak extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, appearance) {
    super(scene);
    this.beakTop = new MyPyramid(this.scene, 4, 15);
    this.beakBottom = new MyPyramid(this.scene, 4, 15);
    this.appearance = appearance;
  }

  display() {
    this.scene.pushMatrix();
    
    this.scene.translate(-5.0, 0.0, 0.0);
    this.scene.rotate(0, 0, Math.PI/2, 1);
    this.beakTop.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.scale(0, -1, 0)
    this.scene.translate(-10.0, 0.0, 0.0);
    
    
    this.beakBottom.display();
    this.scene.popMatrix();
  }



>>>>>>> 114ccd77442d27100c585f7492fc7184916f5643
}