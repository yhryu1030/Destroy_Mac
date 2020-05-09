import stages from "./stages.js"

export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function start ()
    {
        Phaser.Scene.call(this, { key: 'gameclear' });
    },

    init: function(data){
        this.stealthKeys=data.keys;
    },

    preload: function(){

    },
    
    create: function(){
        for(var stage of stages){
            stage.targets=stage.computers.length;
        }
        this.stealthKeys.enabled=true;
        this.add.text(20, 200, 'YOU HAVE CLEARED THE GAME!', { fontSize: '60px', fill: '#FFF' })
        
        this.clickButton = this.add.text(500, 500, 'Retry?', { fontSize: '30px', fill: '#0F0' })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() )
            .on('pointerdown', function() {
                this.scene.start('stealth', {level:1})
            }, this)
            .on('pointerup', () => {
                this.enterButtonHoverState();
        });
    },

    enterButtonHoverState() {
        this.clickButton.setStyle({ fontSize: '30px', fill: '#ff0'});
    },
    
    enterButtonRestState() {
        this.clickButton.setStyle({ fontSize: '30px', fill: '#0f0' });
    },


})