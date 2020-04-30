export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function start ()
    {
        Phaser.Scene.call(this, { key: 'gameover' });
    },
    init: function(data){
        this.stealthKeys=data.keys;
        this.stealthCursors=data.cursors;
    },

    preload: function(){
        this.load.image('gameover','assets/images/gameover.jpg')
    },
    
    create: function(){
        this.add.image(500,310,"gameover")
        this.input.on('pointerdown', function () {
            this.stealthKeys.enabled=true;
            this.scene.start('stealth', {level:1});
        }, this);
    }


})