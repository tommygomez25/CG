import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyQuad } from './primitives/MyQuad.js';

export class MyBillboard extends CGFobject {
  
  constructor(scene,texture,x=0,y=0,z=0,scale=1) {
    super(scene);
    
    this.texture = texture;
    this.appearence = new CGFappearance(this.scene);
    this.appearence.setAmbient(0.1, 0.1, 0.1, 1);
    this.appearence.setDiffuse(0.9, 0.9, 0.9, 1);
    this.appearence.setSpecular(0.1, 0.1, 0.1, 1);
    this.appearence.setShininess(10.0);
    this.appearence.setTexture(this.texture);
    this.appearence.setTextureWrap('REPEAT', 'REPEAT');

    
    this.initBuffers();
    this.x = x
    this.y = y
    this.z = z
    this.scale = scale
  }

  initBuffers() {
   
    this.billboard = new MyQuad(this.scene)
  }

  display() {
    this.scene.pushMatrix();

    let cameraPos = this.scene.camera.position;
    let quadPos = [this.x, 0, this.z];

    let camToQuad = [cameraPos[0] - quadPos[0], 0,cameraPos[2]- quadPos[2]];
    vec3.normalize(camToQuad, camToQuad);
    
    // create vector which is index 0,1,2 of the normals array
    let billboardNormal = vec3.fromValues(this.billboard.normals[0], this.billboard.normals[1], this.billboard.normals[2]);

    let rotationAxis = vec3.create()
    vec3.cross(rotationAxis,billboardNormal, camToQuad);

    let cosAngle = vec3.dot(billboardNormal, camToQuad);
    let angle = Math.acos(cosAngle);

    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(angle, rotationAxis[0], rotationAxis[1], rotationAxis[2]);

    this.scene.translate(0,-0.5,0) // translate back to its place
    this.scene.scale(this.scale,this.scale,this.scale) // scale in origin
    this.scene.translate(0, 0.5, 0); // translate to origin

    this.appearence.apply();
    this.billboard.display();

    this.scene.popMatrix();
}


  enableNormalViz() {
    this.billboard.enableNormalViz();
  }

  disableNormalViz() {
    this.billboard.disableNormalViz();
  }

}