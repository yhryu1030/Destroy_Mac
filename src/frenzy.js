import stealth from "./stealth.js";

export default new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function frenzy ()
    {
        Phaser.Scene.call(this, { key: 'frenzy' });
    },

    preload: function ()
    {
        this.load.image('mac', 'assets/imac.jpg'); // from https://www.pexels.com/photo/photo-of-imac-near-macbook-1029757/
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'mac');

        this.input.once('pointerdown', function () {

            console.log('From frenzy to stealth');

            this.scene.start('stealth');

        }, this);
    }
});
