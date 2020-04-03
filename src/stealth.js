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
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'obstacle');
        
        this.add.image(400, 300, 'obstacle');
        
        player = this.physics.add.sprite(100, 400, 'student');
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        
        // gameOver=false;

        cursors = this.input.keyboard.createCursorKeys();
        computer = this.physics.add.sprite(100, 550, 'computer');
        guard = this.physics.add.sprite(100, 60, 'guard');
        

        logic.setGuards(guard);
        logic.setPhysics(this, player, platforms, guard,gameOver,computer);

        this.input.once('pointerdown', function () {

            console.log('From stealth to frenzy');

            this.scene.start('frenzy');

        }, this);

    },

    update: function()
    {
        logic.patrol(guard);

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

    }

});
