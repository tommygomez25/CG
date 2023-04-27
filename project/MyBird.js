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
  constructor(scene,orientation,velocity,position) {
    super(scene);

    this.setHead()
    this.setBody()
    this.setEyes()
    this.setBeak()
    this.setWings()
    this.setTail()

    this.velocity = velocity
    this.wingVelocity = 0.001
    this.orientation = orientation
    this.position = position
    
    this.offset = 0
    this.wingOffset = 0.0005
    this.previousOrientation = 0
    this.initialPosition = position
    this.x = position[0]
    this.y = position[1]
    this.z = position[2]
    this.rotationLeft = false
    this.rotationRight = false
    this.maxVelocity = 0.5
    this.maxWingVelocity = 0.5
    this.maxHeight = 5
    this.minHeight = 0

    this.previousLeftWingAngle = 0
    this.previousRightWingAngle = 0
  }

  update(t){
    this.offset += this.velocity * t;
    this.wingOffset += this.wingVelocity * t;
    this.x += this.offset * Math.cos(this.orientation) * (-1) / 100
    this.z += this.offset * Math.sin(this.orientation) / 100

    if (this.previousOrientation = this.orientation) {
      this.rotationLeft = false
      this.rotationRight = false
    }
    this.previousOrientation = this.orientation

    //this.updateWingsAngle(t)
  }

  updateHeight(t) {
    let amplitude = 1
    let period = 1
    let b = 2 * Math.PI / period
    this.y = amplitude * Math.sin(b * (t/1000)) + this.initialPosition[1] // t divides by 1000 to convert from milliseconds to seconds
  }

  updateWingsAngle(t) {
    let amplitude = Math.PI / 4
    let period = 1

    t = t / 1000 
    let phase = (this.wingOffset + (this.wingVelocity/5) * t) / period
  
    this.leftWing.angle = amplitude * Math.sin(2 * Math.PI * phase);
    this.rightWing.angle = - amplitude * Math.sin(2 * Math.PI * phase);

    this.previousLeftWingAngle = this.leftWing.angle
    this.previousRightWingAngle = this.rightWing.angle
  }

  // val will be called with a value between -1 and 1
  turn(val) {
    val < 0 ? this.rotationRight = true : this.rotationLeft = true // if val is negative, rotation is to the right
    val *= this.scene.speedFactor / 20
    this.orientation += val
  }

  // val will be called with a value between -1 and 1
  accelerate(val) {

    val *= this.scene.speedFactor / 4000
    
    this.velocity = Math.min(this.velocity + val, this.maxVelocity)
    this.wingVelocity = Math.min(this.wingVelocity + val/2, this.maxWingVelocity)
  }

  reset() { // reset bird to initial position
    this.x = this.initialPosition[0]
    this.y = this.initialPosition[1]
    this.z = this.initialPosition[2]
    this.orientation = 0
    this.velocity = 0
    this.offset = 0
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
      //console.log(this.t)

      //this.scene.translate(0, Math.sin(this.offset) ,0)
      this.scene.translate(this.x, 2, this.z)
      this.scene.rotate(this.orientation, 0, 1, 0);

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
