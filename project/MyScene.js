import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./primitives/MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBirdTail } from "./bird/MyBirdTail.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.earthTexture = new CGFtexture(this, 'images/earth.jpg');
    this.earthAppearance = new CGFappearance(this);
    this.earthAppearance.setTexture(this.earthTexture);
    this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.panoramaTexture = new CGFtexture(this, 'images/panorama4.jpg');

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.panoramSphere = new MyPanorama(this, this.panoramaTexture);

    this.bird = new MyBird(this,0,0,[35,-10,50]); // -0.4,-16,20

    this.terrain = new MyTerrain(this);
    
    this.groupTree = new MyTreeGroupPatch(this, 0, 40, -18.5);

    this.groupTree2 = new MyTreeGroupPatch(this, 0, 50, -18.5);

    this.groupTree3 = new MyTreeGroupPatch(this, 0, 60, -18.5);

    this.rowTree = new MyTreeRowPatch(this, 20, 30, -18.5);

    this.rowTree2 = new MyTreeRowPatch(this, 20, 20, -18.5);

    this.nest = new MyNest(this);

    
    this.birdEggs = [];
    
    for(let i = 0; i < 4; i++){
      this.birdEggs.push(new MyBirdEgg(this));
      this.birdEggs[i].targetPosition = [this.nest.eggPos[i].position[0],this.nest.eggPos[i].position[1],this.nest.eggPos[i].position[2]]
    }
    this.birdEggs.push(new MyBirdEgg(this));
    this.birdEggs[this.birdEggs.length - 1].x = this.bird.x;
    this.birdEggs[this.birdEggs.length - 1].y = -18.65;
    this.birdEggs[this.birdEggs.length - 1].z = this.bird.z;
    this.birdEggs[this.birdEggs.length - 1].targetPosition = [this.nest.x,this.nest.y,this.nest.z]

    /*
    this.birdEggs[0].isTaken = true;
    this.bird.egg = this.birdEggs[0];
    this.bird.egg.x = this.bird.x;
    this.bird.egg.y = this.bird.y;
    this.bird.egg.z = this.bird.z;
    */

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displayNormals = true
    this.speedFactor = 0.3;
    this.scaleFactor = 0.3;

    this.enableTextures(true);

    this.setUpdatePeriod(60/1000);
    this.previousTime = 0;

    this.clickedP = false;
    this.clickedO = false;
    this.pTime = 0;
    this.oTime = 0;

  }
  initLights() {
    this.lights[0].setPosition(5, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(-5, 0, -5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(40, -13, 70),
      vec3.fromValues(30,-18,60)
    );

  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t){
    //this.camera.target = vec3.fromValues(this.bird.x,this.bird.y,this.bird.z);
    //this.camera.position = vec3.fromValues(this.bird.x + 5,this.bird.y + 5,this.bird.z);
    if(this.previousTime != 0){
      var deltaTime = t - this.previousTime;
      this.bird.update(deltaTime);
      this.bird.updateWingsAngle(deltaTime)
    }
    this.previousTime = t;
    
   if (this.startTime === undefined) {
    this.startTime = t;
   }
   var elapsedTime = t - this.startTime;
   
   if (this.gui.isKeyPressed("KeyP")) {
    //keysPressed = true;
    if (!this.clickedP) {
      this.clickedP = true;
      this.pTime = elapsedTime;
    }
   }


   this.bird.updateHeight(elapsedTime);
   if(this.bird.egg == null){
    // iterate this.birdEggs and call nearBird
    for(let i = 0; i < this.birdEggs.length; i++){
      if(this.birdEggs[i].nearBird(this.bird.x,this.bird.y, this.bird.z) && !this.birdEggs[i].isTaken && !this.birdEggs[i].isFalling){ // -0.4,-16,20
        this.bird.pickEgg(this.birdEggs[i])
        this.birdEggs[i].isTaken = true;
        break;
      }
    }
   }

   for(let i = 0; i < this.birdEggs.length; i++){
      if (this.birdEggs[i].isTaken){
        this.birdEggs[i].update(elapsedTime, this.bird.x, this.bird.y, this.bird.z)     
      }
   }



   if (this.gui.isKeyPressed("KeyO")) {
    this.oTime = t;
    if(!this.clickedO) {
      this.clickedO = true;
      
      if (this.bird.egg != null) {this.bird.egg.initialTime = this.oTime}
    }
   }

   /*
   if (this.gui.isKeyPressed("KeyP")) {
    //keysPressed = true;
    if(this.bird.y > -5){
      this.bird.goDown(5,2);
      this.pTime = elapsedTime;
    }*/
  

  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    
    if (this.gui.isKeyPressed("KeyW")) {
      keysPressed = true;
      this.bird.accelerate(0.1)
    }
    if (this.gui.isKeyPressed("KeyS")) {
      keysPressed = true;
      this.bird.accelerate(-0.1)
    }
    if (this.gui.isKeyPressed("KeyA")) {
      keysPressed = true;
      this.bird.turn(1)
    }
    if (this.gui.isKeyPressed("KeyD")) {
      keysPressed = true;
      this.bird.turn(-1)
    }
    if (this.gui.isKeyPressed("KeyR")) {
      keysPressed = true;
      this.bird.reset();
    }
    if (this.gui.isKeyPressed("KeyO")){
      keysPressed = true;
      if (this.bird.x <= 35 && this.bird.x >= 15 && this.bird.z >= 45 && this.bird.z <= 65){
        this.bird.dropEgg();
      }
    }  
    
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.terrain.display();

    this.panoramSphere.display();

    
    this.groupTree.display();

    this.groupTree2.display();

    this.groupTree3.display();

    this.rowTree.display();

    this.rowTree2.display();

    this.bird.display(this.scaleFactor);

    this.birdEggs.forEach(
      (birdEgg) => {
        if(!birdEgg.isTaken){
          birdEgg.display();
        }        
      }
    );

    this.nest.display();
    
    this.checkKeys();

    // ---- END Primitive drawing section
  }
}
