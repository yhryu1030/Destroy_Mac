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
        this.load.image('imac', 'assets/images/imac.jpg'); // from https://www.pexels.com/photo/photo-of-imac-near-macbook-1029757/
        this.load.image('fist', 'assets/punching/punch/punch6.png');
        // this.load.multiatlas('punching', 'assets/punching.json', 'assets'); // loads sprite sheet
        this.load.audio('punchSound','assets/sound/punch1.mp3'); //loads the punching sound
    },

    create: function ()
    {
        // background
        var background = this.add.image(400, 300, 'imac');

        //Sound
        this.punch1 = this.sound.add('punchSound');

        // sprite
        fist = this.add.image(400, 800, 'fist');
        // fist.setScale(0.5, 0.5);

        // animation
        // var frameNames = this.anims.generateFrameNames('punching', { start: 1, end: 9, zeroPad: 1, prefix:'punch/punch', suffix:'.png' }); // calls all the images
        // this.anims.create({ key: 'smack', frames: frameNames, frameRate: 5, repeat: 0 }); // sets speed and repetition of the animation
        // fist.anims.play('smack');

        cursors = this.input.keyboard.createCursorKeys();
        //play Sound : test
        //this.punch1.play();

        // this.add.sprite(400, 300, 'imac');

        this.input.on('pointerdown', function () {

            console.log('punch');

            this.tweens.add({
                targets: fist,
                y: 450,
                duration: 50,
                ease: 'Cubic.easeIn',
                repeat: 0,
                yoyo: true,
            });

        }, this);

    },

    update: function()
    {
        if (cursors.space.isDown) {
            console.log('From frenzy to stealth');

            this.scene.start('stealth');
        }
    }

});
