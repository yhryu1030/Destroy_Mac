var fist;
var cursors;

import stealth from "./stealth.js";

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function frenzy ()
    {
        Phaser.Scene.call(this, { key: 'frenzy' });
    },

    preload: function ()
    {
        // this.load.image('imac', 'assets/imac.jpg'); // from https://www.pexels.com/photo/photo-of-imac-near-macbook-1029757/
        this.load.multiatlas('punching', 'assets/punching.json', 'assets'); // loads sprite sheet
    },

    create: function ()
    {
        // background
        var background = this.add.sprite(0, 0, 'punching', 'imac.jpg');

        // sprite
        fist = this.add.sprite(400, 600, 'punching', 'punch/punch1.png');
        // fist.setScale(0.5, 0.5);

        // animation
        var frameNames = this.anims.generateFrameNames('punching', { start: 1, end: 6, zeroPad: 1, prefix:'punch/punch', suffix:'.png' }); // calls all the images
        this.anims.create({ key: 'punch', frames: frameNames, frameRate: 30, repeat: -1 }); // sets speed and repetition of the animation
        fist.anims.play('punch');

        //keyboard setting
        // this.add.sprite(400, 300, 'imac');

        this.input.on('pointerdown', function () {
            // cursors.reset;
            // this.scene.stop();
            console.log('From frenzy to stealth');
            this.scene.switch('stealth');

        }, this);
    }

});
