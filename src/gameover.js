import stages from "./stages.js";
/** The following is setting up and running codes for the scene that appears when you lose all lives. */
export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function start ()
    {
        Phaser.Scene.call(this, { key: 'gameover' });
    },
    init: function(data){
        this.stealthKeys=data.keys;
    },

    preload: function(){
        this.load.image('gameover','assets/images/gameover.jpg')
    },
    
    create: function(){
        this.add.image(500,310,"gameover")
        this.input.on('pointerdown', function () {
            this.stealthKeys.enabled=true;
            for(var stage of stages){
                stage.targets=stage.computers.length;
            }
            this.scene.start('stealth', {level:1});
        }, this);
    }


})