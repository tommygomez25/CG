import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./primitives/MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBillboard } from "./MyBillboard.js";

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

    this.treeBillboardTexture = new CGFtexture(this, 'images/billboardtree.png');
    this.treeBillboardAppearance = new CGFappearance(this);
    this.treeBillboardAppearance.setTexture(this.treeBillboardTexture);
    this.treeBillboardAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.panoramSphere = new MyPanorama(this, this.panoramaTexture);

    this.bird = new MyBird(this,0,0,[0,3,0]);

    this.terrain = new MyTerrain(this);

    this.billboard = new MyBillboard(this,1,1,1)

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = true
    this.speedFactor = 0.3;
    this.scaleFactor = 0.3;

    this.enableTextures(true);

    this.setUpdatePeriod(60/1000);
    this.previousTime = 0;

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
      vec3.fromValues(-5, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t){
    
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
    this.bird.updateHeight(elapsedTime)
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      keysPressed = true;
      this.bird.accelerate(1)
    }
    if (this.gui.isKeyPressed("KeyS")) {
      keysPressed = true;
      this.bird.accelerate(-1)
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

    this.pushMatrix();
    this.translate(-0.4,0,0);
    this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor)
    //this.bird.display();
    this.popMatrix();

    this.pushMatrix();
    this.treeBillboardAppearance.apply();
    this.billboard.display();
    this.popMatrix();

    this.checkKeys();

    if (this.displayNormals) {
      this.billboard.enableNormalViz();
    }
    else {
      this.billboard.disableNormalViz();
    }
    // ---- END Primitive drawing section
  }
}
