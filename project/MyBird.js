import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyBirdHead } from './bird/MyBirdHead.js'
import { MyBirdEye } from './bird/MyBirdEye.js'
import { MyBirdBeak } from './bird/MyBirdBeak.js'
import { MyBirdBody } from './bird/MyBirdBody.js'
import { MyBirdWing } from './bird/MyBirdWing.js'
import { MyBirdTail } from './bird/MyBirdTail.js'

export class MyBird extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   */
  constructor(scene) {
    super(scene);

    this.setHead()
    this.setBody()
    this.setEyes()
    this.setBeak()
    this.setWings()
    this.setTail()

  }

  setHead(){
    // Head - round sphere
    this.headAppearance = new CGFappearance(this.scene);
    this.headAppearance.setAmbient(1,1,1,1)
    this.headAppearance.setSpecular(0,0,0,0)
    
    this.headAppearance.setShininess(10)

    this.headTexture = new CGFtexture(this.scene,"./images/birdTexture.jpg")
    this.headAppearance.setTexture(this.headTexture)
    this.headAppearance.setTextureWrap('TEXTURE_WRAP','TEXTURE_WRAP')

    this.head = new MyBirdHead(this.scene, this.headAppearance);
    
  }

  setBody(){
    // Body - egg shaped sphere
    this.bodyAppearance = new CGFappearance(this.scene);
    this.bodyAppearance.setAmbient(1,1,1,1)
    this.bodyAppearance.setSpecular(0,0,0,0)
    this.bodyAppearance.setShininess(10)

    this.bodyTexture = new CGFtexture(this.scene,"./images/birdTexture.jpg")
    this.bodyAppearance.setTexture(this.bodyTexture)
    this.bodyAppearance.setTextureWrap('TEXTURE_WRAP','TEXTURE_WRAP')

    this.body = new MyBirdBody(this.scene, this.bodyAppearance);
  }

  setEyes(){
    // Eye - round sphere
    this.eyeAppearance = new CGFappearance(this.scene);
    this.eyeAppearance.setAmbient(1,1,1,1)
    this.eyeAppearance.setSpecular(0,0,0,0)
    this.eyeAppearance.setShininess(10)

    this.eyeTexture = new CGFtexture(this.scene,"./images/birdeye.png")
    this.eyeAppearance.setTexture(this.eyeTexture)
    this.eyeAppearance.setTextureWrap('MIRRORED_REPEAT','MIRRORED_REPEAT')

    this.leftEye = new MyBirdEye(this.scene, this.eyeAppearance, 0);
    this.rightEye = new MyBirdEye(this.scene, this.eyeAppearance, 1);
    }

  setBeak(){

    // Beak - squared pyramid
    this.beakAppearance = new CGFappearance(this.scene);
    this.beakAppearance.setAmbient(1,1,1,1)
    this.beakAppearance.setSpecular(0,0,0,0)
    this.beakAppearance.setShininess(10)

    this.beakTexture = new CGFtexture(this.scene,"./images/birdTexture.jpg")
    this.beakAppearance.setTexture(this.beakTexture)
    this.beakAppearance.setTextureWrap('MIRRORED_REPEAT','MIRRORED_REPEAT')

    this.beak = new MyBirdBeak(this.scene, this.beakAppearance);
  }
    
  setWings() {
    // Wing - plane and triangle
    this.wingAppearance = new CGFappearance(this.scene);
    this.wingAppearance.setAmbient(1,1,1,1)
    this.wingAppearance.setSpecular(0,0,0,0)
    this.wingAppearance.setShininess(10)

    this.wingTexture = new CGFtexture(this.scene,"./images/birdTexture.jpg")
    this.wingAppearance.setTexture(this.wingTexture)
    this.wingAppearance.setTextureWrap('TEXTURE_WRAP','TEXTURE_WRAP')

    this.leftWing = new MyBirdWing(this.scene, this.wingAppearance, 0);
    this.rightWing = new MyBirdWing(this.scene, this.wingAppearance, 1);
  }
  
  setTail() {
    // Tail - pyramid
    this.tailAppearance = new CGFappearance(this.scene);
    this.tailAppearance.setAmbient(1,1,1,1)
    this.tailAppearance.setSpecular(0,0,0,0)
    this.tailAppearance.setShininess(10)

    this.tailTexture = new CGFtexture(this.scene,"./images/birdTexture.jpg")
    this.tailAppearance.setTexture(this.tailTexture)
    this.tailAppearance.setTextureWrap('MIRRORED_REPEAT','MIRRORED_REPEAT')

    this.tail = new MyBirdTail(this.scene, this.tailAppearance);
  }




    display() {
        this.scene.pushMatrix();
        this.head.display();
        this.body.display();
        this.leftEye.display();
        this.rightEye.display();
        this.beak.display();
        this.leftWing.display();
        this.rightWing.display();
        this.tail.display();
        this.scene.popMatrix();
    }
}