import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { CGFtexture } from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
  
  constructor(scene,startX,startZ,y) {
    super(scene);

    this.treeTextures = [];
    this.trees = [];
    this.treeDimensions = [1,2,3];
    this.startX = startX;
    this.startZ = startZ;
    this.y = y;

    this.createTextures();
    this.createTrees();

  }

    createTextures() {
        this.firstTexture = new CGFtexture(this.scene, './images/tree1.png');
        this.treeTextures.push(this.firstTexture);

        this.secondTexture = new CGFtexture(this.scene, './images/tree2.png');
        this.treeTextures.push(this.secondTexture);

        this.thirdTexture = new CGFtexture(this.scene, './images/tree3.png');
        this.treeTextures.push(this.thirdTexture);

    }

    createTrees() {

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let x = this.startX + i * 2 + Math.random() // * 2 to have 2 units between each tree
                let z = this.startZ + j * 2 + Math.random()
                let y = this.y
                let tree = new MyBillboard(this.scene, this.treeTextures[Math.floor(Math.random() * this.treeTextures.length)], x, y, z,this.treeDimensions[Math.floor(Math.random() * this.treeDimensions.length)]);
                this.trees.push(tree);
            }
        }
    }

  display() {
    this.scene.pushMatrix();

    // for each tree, display it
    for (let i = 0; i < this.trees.length; i++) {
        this.trees[i].display();
    }

    this.scene.popMatrix();
}


  enableNormalViz() {
    this.billboard.enableNormalViz();
  }

  disableNormalViz() {
    this.billboard.disableNormalViz();
  }

}