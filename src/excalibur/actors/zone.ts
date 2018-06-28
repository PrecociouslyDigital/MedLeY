import * as ex from 'excalibur'
import {player} from '../main';
import {GameObject} from './gameobject';
export class Zone implements GameObject{
    private area : ex.Trigger;
    constructor(x:number, y:number, time:number){
        this.area= new ex.Trigger({
            width: 100,
            height: 100,
            pos: new ex.Vector(x,y),
            target:player,
            repeat:time
        });
        this.area.on("entertrigger", ()=>{
            alert("triggered zone");
        });
    }

    public add(game:ex.Engine){
        game.add(this.area);
    }
}
