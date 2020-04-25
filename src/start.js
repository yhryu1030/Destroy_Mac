export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function start ()
    {
        Phaser.Scene.call(this, { key: 'start' });
    },

    preload: function(){
        this.load.image('logo','assets/images/start.jpg')
    },
    
    create: function(){
        this.add.image(400,300,"logo")
        this.input.on('pointerdown',()=>this.scene.start('stealth',{level:1}))
    }


})