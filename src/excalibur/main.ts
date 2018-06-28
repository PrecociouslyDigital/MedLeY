import * as ex from 'excalibur';
import * as actors from './actors';
export const game = new ex.Engine();
export const player = new actors.Player();
export function start(){
    new actors.NPC(200, 0).add(game);
    new actors.NPC(0, 200).add(game);
    new actors.Zone(0,-200, 3).add(game);
    game.add(player);
    game.add(new ex.Actor({
        pos: new ex.Vector(200,0),
        color:ex.Color.Green,
        onInitialize : ()=>{console.log("Init!")}
    }))
    game.currentScene.camera.strategy.elasticToActor(player, 1, 0.1);
	game.start();
}
