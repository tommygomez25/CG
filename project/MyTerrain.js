import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MyTerrain extends CGFobject {
  
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(this.scene,30);

        this.initMaterials(scene);
        this.initShaders(scene);
    }

    initShaders(scene) {
        this.terrainShader = new CGFshader(scene.gl, "shaders/heightMap.vert", "shaders/heightMap.frag");
        this.terrainShader.setUniformsValues({ heightmap: 1, altimetry: 2 });
    }

    initMaterials(scene) { 

        this.heightmap = new CGFtexture(scene, "images/heightmap.jpg");
        this.altimetry = new CGFtexture(scene, "images/altimetry.png");

        this.terrainTex = new CGFappearance(scene);
        this.terrainTex.loadTexture("images/terrain.jpg");
        this.terrainTex.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.setActiveShader(this.terrainShader);
        this.heightmap.bind(1);
        this.altimetry.bind(2);

        this.scene.pushMatrix();
        this.scene.translate(0,-50,0);
        this.scene.scale(400,400,400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.terrainTex.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}