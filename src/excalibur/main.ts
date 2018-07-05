import * as ex from 'excalibur';
import * as dialog from '../actions/dialogActions';
import { PlayerSaveState } from '../actions/playerSave';

import * as actors from './actors';



export const game = new ex.Engine();
export const player = new actors.Player();
export function start(){
    new class extends actors.NPC{
        shouldEnter = (state:PlayerSaveState)=>state.timesTalked==0;
        shouldExit = (state:PlayerSaveState)=>state.timesTalked>4;
        dispatchActionCreator = ()=>({
            type: dialog.SELECT_DIALOG,
            path:"root://testing.counter"
        });
    }(200, 0).add(game);
    //new actors.Zone(0,-200, 3).add(game);
    game.add(player);
    game.add(new ex.Label("(WASD to walk) Walk up to the blue square and press E", 100, -100, "20px Arial"));
    game.currentScene.camera.strategy.elasticToActor(player, 1, 0.1);
	game.start();
}
