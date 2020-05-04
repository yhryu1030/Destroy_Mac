export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function start ()
    {
        Phaser.Scene.call(this, { key: 'gameclear' });
    },

    init: function(data){
        this.stealthKeys=data.keys;
        this.stealthCursors=data.cursors;
    },

    preload: function(){
        // this.load.image('gameover','assets/images/gameover.jpg')
    },
    
    create: function(){
        this.add.text(20, 200, 'YOU HAVE CLEARED THE GAME!', { fontSize: '60px', fill: '#FFF' })
        
        this.clickButton = this.add.text(500, 500, 'Retry?', { fontSize: '30px', fill: '#0F0' })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() )
            .on('pointerdown', function() {
                this.stealthKeys.enabled = true,
                this.scene.start('stealth', {level:1})
            }, this)
            .on('pointerup', () => {
                this.enterButtonHoverState();
        });

        // this.add.image(500,310,"gameover")
        // this.input.on('pointerdown', function () {
        //     this.stealthKeys.enabled=true;
        //     this.scene.start('stealth', {level:1});
        // }, this);
    },

    enterButtonHoverState() {
        this.clickButton.setStyle({ fontSize: '30px', fill: '#ff0'});
    },
    
    enterButtonRestState() {
        this.clickButton.setStyle({ fontSize: '30px', fill: '#0f0' });
    },


})