export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function start ()
    {
        Phaser.Scene.call(this, { key: 'gameover' });
    },

    preload: function(){
        this.load.image('gameover','assets/images/gameover.jpg')
    },
    
    create: function(){
        this.add.image(400,300,"gameover")
        this.input.on('pointerdown',()=>this.scene.start('stealth'))
    }


})