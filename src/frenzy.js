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
        this.currentLevel=data.stage;
        this.exit=data.exit;
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
        this.background = this.add.sprite(400, 300, 'imac');

        //Sound
        // this.input.keyboard.enabled=true;
        this.punch1 = this.sound.add('punchSound');

        // sprite
        fist = this.add.image(400, 800, 'fist');
        // fist.setScale(0.5, 0.5);
        if (this.computer.health <= 28 && this.computer.health > 23) {
            this.background.setTexture('stage1');
        }
        else if (this.computer.health <= 23 && this.computer.health > 18) {
            this.background.setTexture('stage2');
        }
        else if (this.computer.health <= 18 && this.computer.health > 13) {
            this.background.setTexture('stage3');
        }
        else if (this.computer.health <= 13 && this.computer.health > 8) {
            this.background.setTexture('stage4');
        }
        else if (this.computer.health <= 8 && this.computer.health > 3) {
            this.background.setTexture('stage5');
        }
        else if (this.computer.health <= 3) {
            this.background.setTexture('stage6');
        }
        

        this.input.on('pointerdown', function () {

            console.log('punch');
            console.log(this.computer.health);
            this.punch1.play();
            this.tweens.add({
                targets: fist,
                y: 450,
                duration: 50,
                ease: 'Cubic.easeIn',
                repeat: 0,
                yoyo: true,
            });
            if(this.computer.health >0){
                this.computer.health--;
                console.log('Hit');
            }
            if (this.computer.health <= 28 && this.computer.health > 23) {
                this.background.setTexture('stage1');
            }
            else if (this.computer.health <= 23 && this.computer.health > 18) {
                this.background.setTexture('stage2');
            }
            else if (this.computer.health <= 18 && this.computer.health > 13) {
                this.background.setTexture('stage3');
            }
            else if (this.computer.health <= 13 && this.computer.health > 8) {
                this.background.setTexture('stage4');
            }
            else if (this.computer.health <= 8 && this.computer.health > 3) {
                this.background.setTexture('stage5');
            }
            else if (this.computer.health <= 3) {
                this.background.setTexture('stage6');
            }
        }, this);

    },

    update: function()
    {
        
        if (this.computer.health ==0) {
            if(this.computer.health <=0){
                this.currentLevel.targets--;
                this.computer.disableBody(true, true);
                if(this.currentLevel.targets<=0){
                    this.exit.setActive(true).setVisible(true);
                    console.log('--------making the exit'); //debug
                }
            }
            console.log('From frenzy to stealth');
            // this.input.keyboard.enabled=false;

            this.cursors.space.isDown=false;
            this.cursors.up.isDown=false;
            this.cursors.down.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;

            this.scene.resume('stealth');
            this.stealthKeys.enabled=true;
            this.scene.stop();
        }
    }


});
