var player;
var platforms;
var cursors;
var computers=[];
// var computer;
// var guard;
var guards=[];
var gameOver=false;
var resetKeys;

import frenzy from "./frenzy.js";
// import * as logic from "./stealthLogics.js";

export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function sceneA ()
    {
        Phaser.Scene.call(this, { key: 'stealth' });
    },

    // cursors:this.input.keyboard.createCursorKeys(),

    preload: function ()
    {
        this.load.image('obstacle', 'assets/images/obstacle.png');
        this.load.image('student', 'assets/images/student.png');
        this.load.image('guard','assets/images/guard.png');
        this.load.image('computer','assets/images/computer.png');
    },

    create: function ()
    {
        gameOver=false;
        
        //Setting obstacles
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'obstacle');
        this.add.image(400, 300, 'obstacle');
        
        //Setting player
        player = this.physics.add.sprite(100, 400, 'student');
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.setVelocityX(0);
        player.setVelocityY(0);
        
        //Setting keyboard
        cursors = this.input.keyboard.createCursorKeys();
        
        resetKeys=false;
        
        //Setting computer
        computers[0] = this.physics.add.sprite(100, 550, 'computer');
        computers[1]=this.physics.add.sprite(0, 550, 'computer');
        computers[0].body.immovable = true;
        computers[1].body.immovable = true;

        //Setting guards
        guards[0] = this.physics.add.sprite(100, 60, 'guard');
        guards[0].setBounce(0);
        guards[0].setCollideWorldBounds(true);
        guards[0].allowGravity = false;
        guards[0].setVelocityX(100);
        // guards[1] = this.physics.add.sprite(500, 600, 'guard');
        // guards[1].setBounce(0);
        // guards[1].setCollideWorldBounds(true);
        // guards[1].allowGravity = false;
        // guards[1].setVelocityX(-100);
        
        
        
        //Setting physics and logics
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(platforms, guards);
        this.physics.add.collider(player, guards,this.getCaught,null,this);
        this.physics.add.collider(player, computers, this.breakComp, null, this);

        this.input.on('pointerdown', function () {

            if(gameOver){
                this.scene.start('stealth');
            }

        }, this);

        
        // this.input.mouse.capture = true;
    },


    update: function()
    {
        this.patrol();
        
        if(!resetKeys){
            cursors.up.isDown=true;
            cursors.up.isUp=true;

            cursors.down.isDown=true;
            cursors.down.isUp=true;

            cursors.right.isDown=true;
            cursors.right.isUp=true;

            cursors.left.isDown=true;
            cursors.left.isUp=true;

            resetKeys=true;
        }

        if (cursors.up.isUp && cursors.down.isUp){
            player.setVelocityY(0);
        }
        if (cursors.left.isUp && cursors.right.isUp){
            player.setVelocityX(0);    
        }
    
        if (cursors.up.isDown && !cursors.up.isUp)
        {
            player.setVelocityY(-160);
        }
        if (cursors.down.isDown && !cursors.down.isUp)
        {
            player.setVelocityY(160);
        }
        if(cursors.right.isDown && !cursors.right.isUp)
        {
            player.setVelocityX(160);
        }
        if (cursors.left.isDown && !cursors.left.isUp)
        {
            player.setVelocityX(-160);
        }

    },

    patrol: function(){
        if(guards[0].x>600){
            guards[0].setVelocityX(-100);
            // guards[1].setVelocityX(100);
        }
        if(guards[0].x<100){ 
            guards[0].setVelocityX(100);
            // guards[1].setVelocityX(-100);
        }

    },

    getCaught: function(player){
        this.physics.pause();

        player.setTint(0xff0001);
    
        gameOver = true;
    
        console.log('Game Over'); //debugging
    },

    breakComp: function(player,computer){
        // this.scene.sleep();
        resetKeys=false;
        this.scene.switch('frenzy');
        console.log('from stealth to frenzy');
        console.log('Broke the Computer'); // debug
        computer.disableBody(true, true);
        
        
        
    }

});
