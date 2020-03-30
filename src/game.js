import stealth from "./stealth.js";
import frenzy from "./frenzy.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ stealth, frenzy ]
};



var game = new Phaser.Game(config);





