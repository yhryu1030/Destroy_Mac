var player;
var platforms;
var cursors;

import frenzy from "./frenzy.js";

export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function sceneA ()
    {
        Phaser.Scene.call(this, { key: 'stealth' });
    },

    preload: function ()
    {
        this.load.image('obstacle', 'assets/obstacle.png');
        this.load.image('student', 'assets/student.png');
    },

    create: function ()
    {
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 300, 'obstacle');
        
        this.add.image(400, 300, 'obstacle');
    
        player = this.physics.add.sprite(100, 450, 'student');
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
    
        this.physics.add.collider(player, platforms);

        this.input.once('pointerdown', function () {

            console.log('From stealth to frenzy');

            this.scene.start('frenzy');

        }, this);

    },

    update: function()
    {
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
