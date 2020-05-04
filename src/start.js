export default new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function start ()
    {
        Phaser.Scene.call(this, { key: 'start' });
    },

    preload: function(){
        this.load.image('title','assets/images/title.png');
        this.load.image('start','assets/images/start.png');
        this.load.audio('bgm','assets/sound/stealth.mp3');
    },

    create: function(){
        this.add.image(500,310,"title").setOrigin(0.5, 0.5);

        this.clickButton = this.add.text(500, 500, 'Start', { fontSize: '30px', fill: '#0f0' })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() )
            .on('pointerdown', () => this.scene.start('stealth',{level:1}) )
            .on('pointerup', () => {
              this.enterButtonHoverState();
          });
          
        //setting up bgm
        let bgm = this.sound.add('bgm');
        bgm.play({
            volume:.3,
            loop:true
        })
    },
    
    enterButtonHoverState() {
        this.clickButton.setStyle({ fontSize: '30px', fill: '#ff0'});
    },
    
    enterButtonRestState() {
        this.clickButton.setStyle({ fontSize: '30px', fill: '#0f0' });
    },


})