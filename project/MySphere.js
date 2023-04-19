import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices 
   * @param  {integer} stacks - number of stacks, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, inside = false) {
    super(scene);
    this.stacks = stacks * 2; 
    this.slices = slices; 
    this.inside = inside;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    

    for (let lat = 0; lat <= this.stacks; lat++) {
      var theta = 0;

      for (let long = 0; long <= this.slices; long++) {
        
        var x = Math.cos(theta) * Math.sin(phi);
        var y = Math.cos(phi);
        var z = Math.sin(-theta) * Math.sin(phi);
        this.vertices.push(x, y, z);

        
        if (lat < this.stacks && long < this.slices) {
            
          var curr = lat * (this.slices + 1) + long;
          var next = curr + (this.slices + 1);
          if(!this.inside){
            this.indices.push(curr, next, curr + 1);
            this.indices.push(next, next + 1, curr + 1);
          }
          else{
            this.indices.push(curr + 1, next, curr);
            this.indices.push(curr + 1, next + 1, next);
          }
          
        }
        if(!this.inside){
          this.normals.push(x, y, z);
        }
        else{
          this.normals.push(-x, -y, -z);
        }
        this.texCoords.push(long / this.slices, lat / this.stacks)

        theta += (2 * Math.PI) / this.slices;
      }

      phi += Math.PI / this.stacks;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}