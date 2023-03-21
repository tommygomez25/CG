import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene,py, pz,  px,  nx,  ny,  nz) {
        super(scene);
        this.initBuffers();
        this.initMats(py, pz, px, nx, ny, nz);
    }
    initBuffers() {
        this.scene.quad = new MyQuad(this.scene);
    }

    initMats(py, pz, px, nz, nx, ny) { //top, front, right, back, left, bottom

        this.top = new CGFappearance(this.scene);
        this.top.setAmbient(0.1, 0.1, 0.1, 1);
        this.top.setDiffuse(0.9, 0.9, 0.9, 1);
        this.top.setSpecular(0.1, 0.1, 0.1, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture(py);
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.front = new CGFappearance(this.scene);
        this.front.setAmbient(0.1, 0.1, 0.1, 1);
        this.front.setDiffuse(0.9, 0.9, 0.9, 1);
        this.front.setSpecular(0.1, 0.1, 0.1, 1);
        this.front.setShininess(10.0);
        this.front.loadTexture(pz);
        this.front.setTextureWrap('REPEAT', 'REPEAT');

        this.right = new CGFappearance(this.scene);
        this.right.setAmbient(0.1, 0.1, 0.1, 1);
        this.right.setDiffuse(0.9, 0.9, 0.9, 1);
        this.right.setSpecular(0.1, 0.1, 0.1, 1);
        this.right.setShininess(10.0);
        this.right.loadTexture(px);
        this.right.setTextureWrap('REPEAT', 'REPEAT');

        this.back = new CGFappearance(this.scene);
        this.back.setAmbient(0.1, 0.1, 0.1, 1);
        this.back.setDiffuse(0.9, 0.9, 0.9, 1);
        this.back.setSpecular(0.1, 0.1, 0.1, 1);
        this.back.setShininess(10.0);
        this.back.loadTexture(nz);
        this.back.setTextureWrap('REPEAT', 'REPEAT');

        this.left = new CGFappearance(this.scene);
        this.left.setAmbient(0.1, 0.1, 0.1, 1);
        this.left.setDiffuse(0.9, 0.9, 0.9, 1);
        this.left.setSpecular(0.1, 0.1, 0.1, 1);
        this.left.setShininess(10.0);
        this.left.loadTexture(nx);
        this.left.setTextureWrap('REPEAT', 'REPEAT');
        
        this.bottom = new CGFappearance(this.scene);
        this.bottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottom.setShininess(10.0);
        this.bottom.loadTexture(ny); 
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {

        this.front.apply();
        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);}
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
            
        //FRONT
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.scene.quad.display();
        this.scene.popMatrix();
        
        this.back.apply();
        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);}
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
            
        //BACK
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.right.apply();

        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);}
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
            
        //RIGTH
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.0, 0.0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();
        
        this.left.apply();
        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);}
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
            
        //LEFT
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.0, 0.0);
        this.scene.rotate(3*Math.PI/2, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.top.apply();
        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);}
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
            
        //TOP 
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.bottom.apply();
        if (this.scene.nearestFilter) {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);}
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
            
        //BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();
        
    }
}

