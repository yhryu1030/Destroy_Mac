var fist;
var cursors;
// var stealthkeys;

import stealth from "./stealth.js";

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:function frenzy ()
    {
        Phaser.Scene.call(this, { key: 'frenzy' });
    },

    init: function(data){
        this.stealthKeys=data.keys;
        this.computer=data.comp;
        this.cursors=this.input.keyboard.createCursorKeys();
    },

    preload: function ()
    {
        this.load.image('imac', 'assets/images/imac.jpg'); // from https://www.pexels.com/photo/photo-of-imac-near-macbook-1029757/
        this.load.image('stage1', 'assets/images/Rstage1.png');
        this.load.image('stage2', 'assets/images/Rstage2.png');
        this.load.image('stage3', 'assets/images/Rstage3.png');
        this.load.image('stage4', 'assets/images/Rstage4.png');
        this.load.image('stage5', 'assets/images/Rstage5.png');
        this.load.image('stage6', 'assets/images/Rstage6.png');
        this.load.image('fist', 'assets/punching/punch/punch6.png');
        // this.load.multiatlas('punching', 'assets/punching.json', 'assets'); // loads sprite sheet
        this.load.audio('punchSound','assets/sound/punch1.mp3'); //loads the punching sound
    },

    create: function ()
    {
        // background
        // var background = this.add.sprite(400, 300, 'imac');
        // var stage1 = this.add.sprite(400, 300, 'stage1');
        this.background = this.add.sprite(400, 300, 'imac');

        //Sound
        this.punch1 = this.sound.add('punchSound');

        // sprite
        fist = this.add.image(400, 800, 'fist');
        // fist.setScale(0.5, 0.5);
        this.input.on('pointerdown', function () {

            console.log('punch');
            console.log(this.computer.health);
            this.punch1.play();
            this.tweens.add({
                targets: fist,
                y: 450,
                duration: 80,
                ease: 'Cubic.easeIn',
                repeat: 0,
                yoyo: true,
            });
            if (this.computer.health == 28) {
                this.background.setTexture('stage1');
            }
            if (this.computer.health == 23) {
                this.background.setTexture('stage2');
            }
            if (this.computer.health == 18) {
                this.background.setTexture('stage3');
            }
            if (this.computer.health == 13) {
                this.background.setTexture('stage4');
            }
            if (this.computer.health == 8) {
                this.background.setTexture('stage5');
            }
            if (this.computer.health == 3) {
                this.background.setTexture('stage6');
            }
            if(this.computer.health >0){
                this.computer.health--;
                console.log('Hit');
            }
        }, this);

    },

    update: function()
    {
        

        if (this.cursors.space.isDown|| this.computer.health ==0) {
            // if(this.computer.health <=0){
            console.log('broken');
            this.computer.disableBody(true, true);
            // }
            console.log('From frenzy to stealth');
            this.cursors.space.isDown=false;
            this.scene.resume('stealth');
            this.stealthKeys.enabled=true;
            this.scene.stop();
        }
    }


});
