import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, 0.5,  //0
            0.5, -0.5, 0.5,   //1
            -0.5, 0.5, 0.5,   //2
            0.5, 0.5, 0.5,    //3
            -0.5, -0.5, -0.5, //4
            0.5, -0.5, -0.5,  //5
            -0.5, 0.5, -0.5,  //6
            0.5, 0.5, -0.5,   //7
		];

			
		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2, 
            3, 2, 1, //FACE DE CIMA
            6, 5, 4,
            5, 6, 7, //FACE DE BAIXO
            1, 5, 3,
            7, 3, 5, //FACE DA FRENTE
            2, 4, 0,
            4, 2, 6, //FACE DE TRÁS
            2, 3, 7,
            6, 2, 7, //FACE DA DIREITA
            5, 1, 0,
            5, 0, 4, //FACE DA ESQUERDA 
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

