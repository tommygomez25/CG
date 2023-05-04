import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './primitives/MySphere.js';

export class MyBirdEgg extends CGFobject {
    
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 30, 15, false, 1, 1.7);
        this.x = this.getRandomArbitrary(-10, 50);
        this.y = -18.65;
        this.z = this.getRandomArbitrary(20,80);
        this.angle = this.getRandomArbitrary(-90, 90);
        this.isFalling = false;
        this.isTaken = false;
        this.inNest = false;

        this.initMaterials(scene);
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    initMaterials(scene){
        this.eggTex = new CGFappearance(scene);
        this.eggTex.loadTexture("images/egg.png");
        this.eggTex.setTextureWrap('REPEAT', 'REPEAT');
    }
    display(){
        this.scene.pushMatrix();
        if(this.isTaken){
            this.scene.translate(0, -0.3, 0)
            this.scene.scale(0.15, 0.15, 0.15);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
        }else if(this.inNest){
            this.scene.translate(this.x,this.y,this.z);
            this.scene.scale(0.15, 0.15, 0.15);
        }
        else{
            this.scene.translate(this.x,this.y,this.z);
            this.scene.scale(0.3, 0.3, 0.3);
            this.scene.rotate(this.angle * Math.PI / 180, 1, 0, 0);
        }
        this.eggTex.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    nearBird(birdX, birdY, birdZ){
        if(this.isTaken) return false;
        let maxDist = 2;
        if(Math.abs(birdX - this.x) < maxDist && Math.abs(birdY - this.y) < 1.5 && Math.abs(birdZ - this.z) < maxDist){
            return true;
        }
        return false;
    }

}
