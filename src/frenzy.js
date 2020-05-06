var fist;
var cursors;


import stealth from "./stealth.js";

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:function frenzy ()
    {
        Phaser.Scene.call(this, { key: 'frenzy' });
    },

    init: function(data){
        this.stealthKeys=data.keys;
        
        this.distance=data.distance;

        this.computer=data.comp;
        this.currentLevel=data.stage;
        this.exit=data.exit;
        
        this.totalTime;
        this.timeLeft;
        this.timedEvent;
        this.timeText;
        
        this.cursors=this.input.keyboard.createCursorKeys();
    },

    preload: function ()
    {
        this.load.image('imac', 'assets/images/resimac.jpg'); // from https://www.pexels.com/photo/photo-of-imac-near-macbook-1029757/
        this.load.image('stage1', 'assets/images/resstage1.png');
        this.load.image('stage2', 'assets/images/resstage2.png');
        this.load.image('stage3', 'assets/images/resstage3.png');
        this.load.image('stage4', 'assets/images/resstage4.png');
        this.load.image('stage5', 'assets/images/resstage5.png');
        this.load.image('stage6', 'assets/images/resstage6.png');
        this.load.image('fist', 'assets/punching/punch/punch6.png');
        this.load.audio('punchSound','assets/sound/punch1.mp3'); //loads the punching sound
    },

    create: function ()
    {
        //Changing time depending on the distance.
        console.log('The distance from the guard is :', this.distance);
        if(this.distance>=300){
            this.totalTime=11;
        }
        else if(this.distance>=150){
            this.totalTime=7;
        }
        else{
            this.totalTime=5;
        }

        // background
        this.background = this.add.sprite(540, 310, 'imac');

        //Sound
        // this.input.keyboard.enabled=true;
        this.punch1 = this.sound.add('punchSound');

        // sprite
        fist = this.add.image(510, 800, 'fist');
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

        //Timer
        this.timedEvent = this.time.delayedCall(this.totalTime*1000, this.getCaught, [], this);
        this.timeText = this.add.text(16, 16, 'Time Left: ', { fontSize: '32px', fill: '#000' });

    },

    update: function()
    {
        this.timeLeft=this.totalTime-this.timedEvent.getElapsedSeconds();
        this.timeText.setText('Time Left: ' + this.timeLeft.toFixed(3));
        // console.log('Event.progress: ',this.timedEvent.getProgress());

        if (this.computer.health ==0) {
            if(this.computer.health <=0){
                this.currentLevel.targets--;
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
    },

    getCaught: function(){
            
        this.cursors.down.isDown=false;
        this.cursors.up.isDown=false;
        this.cursors.right.isDown=false;
        this.cursors.left.isDown=false;
        console.log('Game Over'); //debugging
        this.scene.stop('stealth');
        this.scene.stop();
        this.scene.start('gameover',{keys:this.stealthKeys});

    }


});
