import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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

                var sa1=Math.sin(ang+alphaAng);
                var saa1=Math.sin(ang+alphaAng+alphaAng);
                var ca1=Math.cos(ang+alphaAng);
                var caa1=Math.cos(ang+alphaAng+alphaAng);    
                
                var sa_1=Math.sin(ang-alphaAng);
                var saa_1=Math.sin(ang);
                var ca_1=Math.cos(ang-alphaAng);
                var caa_1=Math.cos(ang);  

                //this.vertices.push(0, 1, 0);
                
                    this.vertices.push(ca, -sa, (j+1)*stackHeight);
                    this.vertices.push(ca,-sa, j*stackHeight);
                    this.vertices.push(caa, -saa, j*stackHeight);
                    this.vertices.push(caa, -saa, (j+1)*stackHeight);
                

                // triangle normal computed by cross product of two edges
                var normal0= [
                    saa-sa,
                    caa-ca,
                    0
                ];

                var normal1= [
                    saa1-sa1,
                    caa1-ca1,
                    0
                ];

                // create var normal that is sum between normal0 and normal1
                var normal = [
                    normal0[0]+normal1[0],
                    normal0[1]+normal1[1],
                    normal0[2]+normal1[2]
                ]

                var normal_1 = [
                    saa_1-sa_1,
                    caa_1-ca_1,
                    0
                ];

                var normal_ = [
                    normal0[0]+normal_1[0],
                    normal0[1]+normal_1[1],
                    normal0[2]+normal_1[2]
                ]

                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;

                //normalize normal_
                var nsize_=Math.sqrt(
                    normal_[0]*normal_[0]+
                    normal_[1]*normal_[1]+
                    normal_[2]*normal_[2]
                    );
                normal_[0]/=nsize_;
                normal_[1]/=nsize_;
                normal_[2]/=nsize_;

                // push normal once for each vertex of this triangle
                
                    this.normals.push(...normal_);
                    this.normals.push(...normal_);
                    this.normals.push(...normal);
                    this.normals.push(...normal);
                
                
                
                    this.indices.push(4*(i) + 4*j*this.slices + 2, 4*(i) + 4*j*this.slices + 1, 4*(i) + 4*j*this.slices);
                    this.indices.push(4*(i) + 4*j*this.slices + 3, 4*(i) + 4*j*this.slices + 2, 4*(i) + 4*j*this.slices);
                
                

                ang+=alphaAng;
            }
            //print vertices and indices
            console.log('vertices: ', this.vertices, 'indices: ', this.indices);
        
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

