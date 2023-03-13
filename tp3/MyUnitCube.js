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
            -0.5, -0.5, 0.5,  //0 8
            0.5, -0.5, 0.5,   //1 9 
            -0.5, 0.5, 0.5,   //2 10 
            0.5, 0.5, 0.5,    //3 11
            -0.5, -0.5, -0.5, //4 12
            0.5, -0.5, -0.5,  //5 13
            -0.5, 0.5, -0.5,  //6 14
            0.5, 0.5, -0.5,   //7 15
            -0.5, -0.5, 0.5,  //0 16
            0.5, -0.5, 0.5,   //1 17
            -0.5, 0.5, 0.5,   //2 18
            0.5, 0.5, 0.5,    //3 19
            -0.5, -0.5, -0.5, //4 20
            0.5, -0.5, -0.5,  //5 21
            -0.5, 0.5, -0.5,  //6 22
            0.5, 0.5, -0.5,   //7 23
		];

			
		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2, 
            3, 2, 1, //FACE DE CIMA
            5, 4, 6,
            5, 6, 7, //FACE DE BAIXO
            9, 13, 11,
            15, 11, 13, //FACE DA FRENTE
            10, 12, 8,
            12, 10, 14, //FACE DE TRÁS
            18, 19, 23,
            22, 18, 23, //FACE DA DIREITA
            21, 17, 16,
            21, 16, 20, //FACE DA ESQUERDA
		];

            this.normals = [
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, -1,
                  0, 0, -1,
                  0, 0, -1,
                  0, 0, -1,
                  -1, 0, 0,
                  1, 0, 0,
                  -1, 0, 0,
                  1, 0, 0,
                  -1, 0, 0,
                  1, 0, 0,
                  -1, 0, 0,
                  1, 0, 0,
                  0, -1, 0,
                  0, -1, 0,
                  0, 1, 0,
                  0, 1, 0,
                  0, -1, 0,
                  0, -1, 0,
                  0, 1, 0,
                  0, 1, 0,
              ];            


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
      
}

