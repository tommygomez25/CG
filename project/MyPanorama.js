import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from './primitives/MySphere.js'; 

export class MyPanorama extends CGFobject {
  
  constructor(scene, texture) {
    super(scene);
    
    this.texture = texture;
    this.panoramaAppearance = new CGFappearance(this.scene);
    this.panoramaAppearance.setTexture(this.texture);

    this.initBuffers();
  }

  initBuffers() {
   
    this.panoramSphere = new MySphere(this.scene, 30, 15, true); 
  }

  display() {
    this.scene.pushMatrix();
    this.panoramaAppearance.apply();
    this.scene.translate(...this.scene.camera.position);
    this.scene.scale(200,200,200);
    
    this.panoramSphere.display();
    this.scene.popMatrix();
  }
}