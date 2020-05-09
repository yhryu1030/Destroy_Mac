import stealth from "./stealth.js";
import frenzy from "./frenzy.js";
import start from "./start.js";
import gameover from "./gameover.js";
import gameclear from "./gameclear.js";

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1080,
    height: 620,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ start, stealth, frenzy, gameover, gameclear ] //Setting up saves as one part of the game.
};

var game = new Phaser.Game(config);