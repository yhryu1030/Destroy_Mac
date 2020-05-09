var fist;
/** The following is setting up and running codes for the frenzy mode. */
export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:function frenzy ()
    {
        Phaser.Scene.call(this, { key: 'frenzy' });
    },

    init: function(data){
        //Receiving values from the stealth scene data.
        this.stealthKeys=data.keys;
        
        this.distance=data.distance;

        this.computer=data.comp;
        this.currentLevel=data.stage;
        this.exit=data.exit;
        this.player=data.player;

        //Tutorial setting
        if(this.currentLevel.level=='tutorial1'){
            this.clickMe;
            this.tutorialClick=false;
        }

        //Setting timer.
        this.totalTime;
        this.timeLeft;
        this.timedEvent;
        this.timeText;

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
        this.punch1 = this.sound.add('punchSound');

        // sprite
        fist = this.add.image(510, 800, 'fist');

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
        //Click Here text in the tutorial level
        if(this.currentLevel.level=='tutorial1'){
            this.clickMe= this.add.text(350, 100, 'Click Here to Smash', { fontSize: '35px', fill: '#000' });
        }
        //Hitting the computer
        this.input.on('pointerdown', function () {

            this.punch1.play();
            this.tweens.add({
                targets: fist,
                y: 450,
                duration: 50,
                ease: 'Cubic.easeIn',
                repeat: 0,
                yoyo: true,
            });
            
            this.computer.health--;
            
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

            if(this.currentLevel.level=='tutorial1'){
                this.clickMe.setActive(false).setVisible(false);
            }
        }, this);

        //Timer
        this.timedEvent = this.time.delayedCall(this.totalTime*1000, this.getCaught, [], this);
        this.timeText = this.add.text(16, 16, 'Time Left: ', { fontSize: '32px', fill: '#000' });

    },

    update: function()
    {   //Updates time left for frenzy mode in the left hand corner.
        this.timeLeft=this.totalTime-this.timedEvent.getElapsedSeconds();
        this.timeText.setText('Time Left: ' + this.timeLeft.toFixed(3));

        if (this.computer.health <=0) {
            this.currentLevel.targets--;
            if(this.currentLevel.targets<=0){
                this.exit.setActive(true).setVisible(true);
            }
            this.scene.stop();
            this.scene.resume('stealth');
            this.stealthKeys.enabled=true;
        }
    },

    getCaught: function(){
        
        this.player.health--;
        //Game over condition
        if(this.player.health==0){
            this.scene.stop('stealth');
            this.scene.stop();
            this.scene.start('gameover',{keys:this.stealthKeys});
        }
        else{//Lose one life and go back to stealth's initial player's position.
            this.player.setPosition(this.currentLevel.player.X, this.currentLevel.player.Y);
            this.scene.resume('stealth');
            this.stealthKeys.enabled=true;
            this.scene.stop();
        }
    }


});
