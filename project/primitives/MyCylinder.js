import {CGFobject} from '../../lib/CGF.js';
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
        
        var vertexMap = new Map();
        var index = 0;
        var stackHeight = 1 / this.stacks;
        for (var j = 0; j < this.stacks; j++) {
            var ang = 0;
            var alphaAng = 2 * Math.PI / this.slices;
            for (var i = 0; i < this.slices; i++) {
                // calculate vertices
                var sa = Math.sin(ang);
                var saa = Math.sin(ang + alphaAng);
                var ca = Math.cos(ang);
                var caa = Math.cos(ang + alphaAng);

                var sa1 = Math.sin(ang + alphaAng);
                var saa1 = Math.sin(ang + alphaAng + alphaAng);
                var ca1 = Math.cos(ang + alphaAng);
                var caa1 = Math.cos(ang + alphaAng + alphaAng);

                var sa_1 = Math.sin(ang - alphaAng);
                var saa_1 = Math.sin(ang);
                var ca_1 = Math.cos(ang - alphaAng);
                var caa_1 = Math.cos(ang);
                
                var normalss = this.calculateNormal(sa, ca, saa, caa, sa1,saa1,ca1,caa1,sa_1, ca_1, saa_1, caa_1);

                // add vertices to map and get index
                var index1 = vertexMap.get(`${ca}-${-sa}-${j*stackHeight}`);
                if (index1 === undefined) {
                    this.vertices.push(ca, -sa, j*stackHeight);
                    this.normals.push(normalss[0], normalss[1], normalss[2]);
                    index1 = index++;
                    vertexMap.set(`${ca}-${-sa}-${j*stackHeight}`, index1);
                }

                var index2 = vertexMap.get(`${ca}-${-sa}-${(j+1)*stackHeight}`);
                if (index2 === undefined) {
                    this.vertices.push(ca, -sa, (j+1)*stackHeight);
                    this.normals.push(normalss[3], normalss[4], normalss[5]);
                    index2 = index++;
                    vertexMap.set(`${ca}-${-sa}-${(j+1)*stackHeight}`, index2);
                }

                var index3 = vertexMap.get(`${caa}-${-saa}-${j*stackHeight}`);
                if (index3 === undefined) {
                    this.vertices.push(caa, -saa, j*stackHeight);
                    this.normals.push(normalss[6], normalss[7], normalss[8]);
                    index3 = index++;
                    vertexMap.set(`${caa}-${-saa}-${j*stackHeight}`, index3);
                }

                var index4 = vertexMap.get(`${caa}-${-saa}-${(j+1)*stackHeight}`);
                if (index4 === undefined) {
                    this.vertices.push(caa, -saa, (j+1)*stackHeight);
                    this.normals.push(normalss[9], normalss[10], normalss[11]);
                    index4 = index++;
                    vertexMap.set(`${caa}-${-saa}-${(j+1)*stackHeight}`, index4);
                }
                


                // create prism indexes in and out
                this.indices.push(index1, index2, index3);
                this.indices.push(index3, index2, index4);
                this.indices.push(index3, index2, index1);
                this.indices.push(index4, index2, index3);

                ang += alphaAng;
            }
        }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}

    calculateNormal(sa, ca, saa, caa, sa1,saa1,ca1,caa1,sa_1, ca_1, saa_1, caa_1) {
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
        
        // reutrn normal_, normal_, normal, normal
        return [normal_[0], normal_[1], normal_[2], normal_[0], normal_[1], normal_[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2]];
    }

    /**
     *
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


