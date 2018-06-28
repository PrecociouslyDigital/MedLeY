import * as ex from 'excalibur'
import {player} from '../main';
export class NPC {
    private actor : ex.Actor;
    private area : ex.Trigger;
    private active : boolean = false;
    constructor(x, y){
        this.actor = new ex.Actor({
            pos: new ex.Vector(x,y),
            width: 64,
            height:64,
            color:ex.Color.Blue,
            collisionType: ex.CollisionType.Fixed
        });
        this.area= new ex.Trigger({
            width: 100,
            height: 100,
            pos: new ex.Vector(x,y),
            target:player,
            action:  ()=>{this.active = true;}
        });
        this.area.on("entertrigger", ()=>{
            this.active = true;
        });
        this.area.on("exittrigger", (evt)=>{
            this.active = false;
        });
        this.area.visible = true;

    }

    public interact(){
        if(this.active){
            alert("fired interact");
        }
    }

    public add(game:ex.Engine){
        game.add(this.actor);
        game.add(this.area);
        game.input.keyboard.on("press", (evt:any) => {
            if(evt.key == ex.Input.Keys.E)
                this.interact();
        });
    }
}
