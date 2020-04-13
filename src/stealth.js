var player;
var platforms;
// var cursors;
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

    init: function(){
        this.cursors=this.input.keyboard.createCursorKeys();
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
        // cursors = this.input.keyboard.createCursorKeys();
        
        resetKeys=false;
        
        //Setting computer
        computers[0] = this.physics.add.sprite(100, 550, 'computer');
        computers[1]=this.physics.add.sprite(0, 550, 'computer');
        computers[0].body.immovable = true;
        computers[1].body.immovable = true;
        computers[0].health=5;
        computers[1].health=5;

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
        // cursors = this.input.keyboard.createCursorKeys();
        
        if(!resetKeys){
            console.log('Resetting'); //debugging

            player.setVelocityY(0);
            player.setVelocityX(0);
            resetKeys=true;

            this.cursors.up.isDown=true;
            this.cursors.up.isDown=false;
            this.cursors.up.isUp=true;
            // this.cursors.up.isUp=false;
            // this.cursors.up.isUp=true;

            this.cursors.down.isDown=true;
            this.cursors.down.isDown=false;
            this.cursors.down.isUp=true;
            // this.cursors.down.isUp=false;
            // this.cursors.down.isUp=true;

            this.cursors.right.isDown=true;
            this.cursors.right.isDown=false;
            this.cursors.right.isUp=true;
            // this.cursors.right.isUp=false;
            // this.cursors.right.isUp=true;

            this.cursors.left.isDown=true;
            this.cursors.left.isDown=false;
            this.cursors.left.isUp=true;
            // this.cursors.left.isUp=false;
            // this.cursors.left.isUp=true;

        }
        // resetKeys=true;

        if (this.cursors.up.isUp && this.cursors.down.isUp){
            player.setVelocityY(0);
            // console.log('Not upwards'); 
        }
        if (this.cursors.left.isUp && this.cursors.right.isUp){
            player.setVelocityX(0); 
            // console.log('Not sideways'); 
        }
    
        if (this.cursors.up.isDown && !this.cursors.up.isUp)
        {
            player.setVelocityY(-160);
            // console.log('Going up'); 
        }
        if (this.cursors.down.isDown && !this.cursors.down.isUp)
        {
            player.setVelocityY(160);
            // console.log('Going down'); 
        }
        if(this.cursors.right.isDown && !this.cursors.right.isUp)
        {
            player.setVelocityX(160);
            // console.log('Going right'); 
        }
        if (this.cursors.left.isDown && !this.cursors.left.isUp)
        {
            player.setVelocityX(-160);
            // console.log('Going left'); 
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
        this.scene.sleep();
        this.scene.switch('frenzy');
        console.log('from stealth to frenzy');
        resetKeys=false;
        computer.disableBody(true, true);
        console.log('Broke the Computer'); // debug
        
        
    }

});
