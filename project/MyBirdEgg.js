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
        this.velocity = 0;
        this.orientation = 0;
        this.initialTime = 0
        this.vy = 0
        this.targetPosition = [0,0,0]

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
        else if (this.isFalling) {
            this.drop()
            this.scene.translate(this.x,this.y,this.z);
            this.scene.scale(0.15, 0.15, 0.15);
            this.scene.rotate(this.angle * Math.PI / 180, 1, 0, 0);
        }
        else{
            this.scene.translate(this.x,this.y,this.z);
            this.scene.scale(0.15, 0.15, 0.15);
            this.scene.rotate(this.angle * Math.PI / 180, 1, 0, 0);
        }
        this.eggTex.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    nearBird(birdX, birdY, birdZ){
        if(this.isTaken) return false;
        let maxDist = 2;
        if(Math.abs(birdX - this.x) < maxDist && Math.abs(birdY - this.y) < 1.0 && Math.abs(birdZ - this.z) < maxDist){
            return true;
        }
        return false;
    }

    update(t,bird_x,bird_y,bird_z){
        this.x = bird_x
        this.y = bird_y
        this.z = bird_z
    }

      drop() {
        const gravity = 9.8 *0.1
        const now = new Date().getTime()
        const t = (now - this.initialTime) / 1000

        this.y -= this.vy * t + (gravity * t * t) /2
        this.vy += gravity * t;
        
        const dx = this.targetPosition[0] - this.x
        const dy = this.targetPosition[1] - this.y
        const dz = this.targetPosition[2] - this.z

        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const direction = [dx / distance, dy / distance, dz / distance]

        this.x += direction[0] 
        this.z += direction[2]

        if (this.y <= this.targetPosition[1]) {
            this.y = this.targetPosition[1]
            this.x = this.targetPosition[0]
            this.z = this.targetPosition[2]
            this.inNest = true
            this.isFalling = false
            this.vy = 0
            this.initialTime = 0
            this.scene.clickedO = false
        }

      }
      

}
