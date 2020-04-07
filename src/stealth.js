var player;
var platforms;
var cursors;
var computer;
var guard;
var gameOver=false;

import frenzy from "./frenzy.js";
import * as logic from "./stealthLogics.js";

export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function sceneA ()
    {
        Phaser.Scene.call(this, { key: 'stealth' });
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
        gameOver=false;

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'obstacle');
        this.add.image(400, 300, 'obstacle');
        
        player = this.physics.add.sprite(100, 400, 'student');
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        
        cursors = this.input.keyboard.createCursorKeys();
        
        computer = this.physics.add.sprite(100, 550, 'computer');
        
        guard = this.physics.add.sprite(100, 60, 'guard');
        guard.setBounce(0);
        guard.setCollideWorldBounds(true);
        guard.allowGravity = false;
        guard.setVelocityX(100);
        
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(platforms, guard);
        this.physics.add.collider(player, guard,this.getCaught,null,this);
        this.physics.add.collider(player, computer, this.breakComp, null, this);
    },


    update: function()
    {
        this.patrol();

        if (!cursors.up.isDown && !cursors.down.isDown){
            player.setVelocityY(0);
        }
        if (!cursors.left.isDown && !cursors.right.isDown){
            player.setVelocityX(0);    
        }
    
        if (cursors.up.isDown)
        {
            player.setVelocityY(-160);
        }
        if (cursors.down.isDown)
        {
            player.setVelocityY(160);
        }
        if(cursors.right.isDown)
        {
            player.setVelocityX(160);
        }
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
        }

    },

    patrol: function(){
        if(guard.x>600){
            guard.setVelocityX(-100);
        }
        if(guard.x<100){ 
            guard.setVelocityX(100);
        }
    },

    getCaught: function(player){
        this.physics.pause();

        player.setTint(0xff0001);
    
        gameOver = true;
    
        console.log('Game Over'); //debugging
    },

    breakComp: function(player,computer){
        this.scene.start('frenzy');
        console.log('from stealth to frenzy');
        //console.log('Broke the Computer'); // debug
        computer.disableBody(true, true);
    }

});
