import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './primitives/MySphere.js';

export class MyNest extends CGFobject {
    
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 30, 15, false, 1, -1);
        this.x = 20;
        this.y = -18;
        this.z = 50;
        this.eggPos = [];
        
        this.eggPos.push({position: [20, -18.5, 50.5], taken: false});
        this.eggPos.push({position: [20.5, -18.5, 50], taken: false});
        this.eggPos.push({position: [20.5, -18.5, 50.5], taken: false});
        this.eggPos.push({position: [20, -18.5, 50], taken: false});
        

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

    addEgg(egg, bird){
        egg.inNest = true;
        egg.isTaken = false;
        for(let i = 0; i < this.eggPos.length; i++){
            if(!this.eggPos[i].taken){
                egg.x = this.eggPos[i].position[0];
                egg.y = bird.y - 0.3;
                egg.z = this.eggPos[i].position[2];
                this.eggPos[i].taken = true;
                break;
            }
        }
    }
}
