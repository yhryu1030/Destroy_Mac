var player;
var platforms;
var computers=[];
var guards=[];

import frenzy from "./frenzy.js";

export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function sceneA ()
    {
        Phaser.Scene.call(this, { key: 'stealth' });
    },

    init: function(){
        //Setting keyboard.
        this.cursors=this.input.keyboard.createCursorKeys();
        this.gameOver=false;
        // this.reset=true;
    },

    preload: function ()
    {
        this.load.image('obstacle', 'assets/images/obstacle.png');
        this.load.image('student', 'assets/images/student.png');
        this.load.image('guard','assets/images/guard.png');
        this.load.image('computer','assets/images/computer.png');
    },

    create: function ()
    {
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
        
        //Setting computer
        computers[0] = this.physics.add.sprite(100, 550, 'computer');
        computers[0].setDisplaySize(30,30);
        computers[1]=this.physics.add.sprite(0, 550, 'computer');
        computers[1].setDisplaySize(30,30);
        computers[0].body.immovable = true;
        computers[1].body.immovable = true;
        computers[0].health=33;
        computers[1].health=33;

        //Setting guards
        guards[0] = this.physics.add.sprite(100, 60, 'guard');
        guards[0].setDisplaySize(60,80)
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
        this.physics.add.overlap(player, computers, this.breakComp, null, this);

        // this.input.on('pointerdown', function () {

        //     if(this.gameOver){
        //         this.scene.start('stealth');
        //     }

        // }, this);
    },


    update: function()
    {
        this.patrol();
        if (this.cursors.up.isUp && this.cursors.down.isUp){
            player.setVelocityY(0);
        }
        if (this.cursors.left.isUp && this.cursors.right.isUp){
            player.setVelocityX(0); 
        }
    
        if (this.cursors.up.isDown)
        {
            player.setVelocityY(-160);
        }
        if (this.cursors.down.isDown)
        {
            player.setVelocityY(160);
        }
        if(this.cursors.right.isDown)
        {
            player.setVelocityX(160);
        }
        if (this.cursors.left.isDown)
        {
            player.setVelocityX(-160);
        }

    },

    patrol: function(){
        if(guards[0].x>600){
            guards[0].setVelocityX(-100);
        }
        if(guards[0].x<100){ 
            guards[0].setVelocityX(100);
        }
    },

    getCaught: function(player){
        this.physics.pause();

        player.setTint(0xff0001);
    
        this.gameOver = true;

        if(this.gameOver){

            
            this.cursors.space.isDown=false;
            
            this.cursors.down.isDown=false;
            this.cursors.up.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;
            this.scene.start('gameover');


        }

    
        console.log('Game Over'); //debugging
    },

    breakComp: function(player,computer){
        if(this.cursors.space.isDown){
            //Reset keys
            this.input.keyboard.enabled=false;
            
            this.cursors.space.isDown=false;
            
            this.cursors.down.isDown=false;
            this.cursors.up.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;

            //Reset the player's velocity
            player.setVelocityY(0);
            player.setVelocityX(0); 

            //Start the frenzy mode.
            this.scene.launch('frenzy', {comp:computer, keys:this.input.keyboard});
            this.scene.pause();
            console.log('from stealth to frenzy');  
        }

    }

});
