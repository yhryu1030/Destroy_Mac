import stealth from "./stealth.js";
import frenzy from "./frenzy.js";
import start from "./start.js";
import gameover from "./gameover.js";

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ start, stealth, frenzy, gameover ]
};

var game = new Phaser.Game(config);