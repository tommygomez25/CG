import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.slices = slices
        this.stacks = stacks
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        
        var stackHeight = 1/this.stacks;
        for(var j = 0; j < this.stacks; j++){
            var ang = 0;
            var alphaAng = 2*Math.PI/this.slices;
            for(var i = 0; i < this.slices; i++){
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different
                
                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);

                //this.vertices.push(0, 1, 0);
                this.vertices.push(ca, -sa, (j+1)*stackHeight);
                this.vertices.push(ca,-sa, j*stackHeight);
                this.vertices.push(caa, -saa, j*stackHeight);
                this.vertices.push(caa, -saa, (j+1)*stackHeight);
                console.log('j*sH: ', j*stackHeight, ' (j+1)*sH: ', (j+1)*stackHeight)

                // triangle normal computed by cross product of two edges
                var normal= [
                    saa-sa,
                    caa-ca,
                    0,
                ];

                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;

                // push normal once for each vertex of this triangle
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal)
                        

                // create prism indexes
                this.indices.push( 4*i + 4*j*this.slices + 2, 4*i + 4*j*this.slices + 1, 4*i + 4*j*this.slices);
                this.indices.push(4*i + 4*j*this.slices + 3, 4*i + 4*j*this.slices + 2,4*i + 4*j*this.slices );


                ang+=alphaAng;
            }
        
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

