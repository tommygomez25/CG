import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene,'displayDiamond').name('Diamond');
        this.gui.add(this.scene,'displayTriangle').name('Triangle');
        this.gui.add(this.scene,'displayParallelogram').name('Parallelogram');
        this.gui.add(this.scene,'displaySmallTriangle').name('Small Triangle');
        this.gui.add(this.scene,'displayBigTriangle').name('Big Triangle');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Diamond checkbox
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        //Triangle checkbox
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        //Parallelogram checkbox
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');

        //Triangle Small checkbox
        this.gui.add(this.scene, 'displayTriangleSmall').name('Display Triangle Small');

        //Triangle Big checkbox
        this.gui.add(this.scene, 'displayTriangleBig').name('Display Triangle Big');

        return true;
    }
}