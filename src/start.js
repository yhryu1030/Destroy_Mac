export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function start ()
    {
        Phaser.Scene.call(this, { key: 'start' });
    },

    preload: function(){
        this.load.image('title','assets/images/title.png');
        this.load.image('start','assets/images/start.png');
    },

    create: function(){
        this.add.image(500,310,"title");
        var button = this.add.image(590,500,"start")
            .setInteractive()
            .on('pointerdown',()=>this.scene.start('stealth',{level:1}));
    }


})