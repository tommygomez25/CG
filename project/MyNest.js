import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './primitives/MySphere.js';

export class MyNest extends CGFobject {
    
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 30, 15, false, 1, -1);
        this.x = 20;
        this.y = -18;
        this.z = 50;

        this.initMaterials(scene);
    }

    initMaterials(scene){
        this.eggTex = new CGFappearance(scene);
        this.eggTex.loadTexture("images/nest.jpg");
        this.eggTex.setTextureWrap('REPEAT', 'REPEAT');
    }
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.eggTex.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
