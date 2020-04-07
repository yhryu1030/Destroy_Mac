/** General setups */
export function setPhysics(scene, player, platforms, guard,gameOver,computer){
    scene.physics.add.collider(player, platforms);
    scene.physics.add.collider(platforms, guard);
    scene.physics.add.collider(player, guard,getCaught,null,scene);
    scene.physics.add.collider(player, computer, breakComp, null, scene);
}
/*
Guards Section
*/

//The functions setting up the guards and the lose condition expressed as a pause.
export function setGuards(guard){
    // guard = guards.create(100, 60, 'guard');
    guard.setBounce(0);
    guard.setCollideWorldBounds(true);
    guard.allowGravity = false;
    guard.setVelocityX(100);
}
function getCaught (player, guard,gameOver)
{
    this.physics.pause();

    player.setTint(0xff0001);

    gameOver = true;

    console.log('Game Over'); //debugging
}

export function patrol(guard){
    if(guard.x>600){
        guard.setVelocityX(-100);
    }
    else if(guard.x<100){ 
        guard.setVelocityX(100);
    }
}

/** Functions for computers */

function breakComp(player,computer,scene){
    console.log('Broke the Computer'); // debug

    computer.disableBody(true, true);
    // this.scene.start('frenzy');
}
