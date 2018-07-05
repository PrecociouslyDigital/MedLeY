import * as ex from 'excalibur'
import {player} from '../main';
import { PlayerSaveState } from '../../actions/playerSave';
import store, { StoreState } from '../../store/store';
import { createSelector } from 'reselect';

export abstract class NPC {
    private actor : ex.Actor;
    private area : ex.Trigger;
    private active : boolean = false;
    private game : ex.Engine;
    private interactEvent : any;
    private cancelEnterSub : any;
    private cancelExitSub : any;

    abstract dispatchActionCreator : ()=>{type:string};

    abstract shouldEnter: (state : PlayerSaveState)=>boolean;
    abstract shouldExit: (state : PlayerSaveState)=>boolean;

    private afterEnter(){
        this.game.add(this.actor);
        this.game.add(this.area);
        this.interactEvent = (evt:any) => {
            if(evt.key == ex.Input.Keys.E)
                this.interact();
        };
        this.game.input.keyboard.on("press", this.interactEvent);
    }

    private beforeExit(){
        this.game.input.keyboard.off("press", this.interactEvent);
        this.game.remove(this.actor);
        this.game.remove(this.area);
    }

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
            action: ()=>{this.active = true;}
        });
        this.area.on("entertrigger", ()=>{
            this.active = true;
        });
        this.area.on("exittrigger", (evt)=>{
            this.active = false;
        });
        
        
    }

    public interact(){
        if(this.active && store.getState().currentConversation == null){
            store.dispatch(this.dispatchActionCreator());
        }
    }

    public add(game:ex.Engine){
        const enterFunction = ()=>{
            const exitSelector = createSelector((state: StoreState) => state.gameState.playerState, this.shouldExit);
            this.afterEnter();
            this.cancelExitSub = store.subscribe(()=>{
                if(exitSelector(store.getState())){
                    this.cancelExitSub();
                    this.beforeExit();
                }
            });
        }
        this.game = game;
        const enterSelector = createSelector((state: StoreState) => state.gameState.playerState, this.shouldEnter);
        if(enterSelector(store.getState())){
            enterFunction();
        }else{
            this.cancelEnterSub = store.subscribe(()=>{
                if(enterSelector(store.getState())){
                    this.cancelEnterSub();
                    enterFunction();
                }
            });
        }
        
    }

}
