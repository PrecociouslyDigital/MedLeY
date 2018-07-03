import {DialogNode} from './dialogHelpers';
import * as PlayerSave from '../reducers/playerSave';
import * as React from 'react';

export interface DialogOptionTree {
    [key:string] : DialogNode | DialogOptionTree;
}

//To make code cleaner, parts of conversations can be pulled out into their own consts in their own files.
const byePlayer = new DialogNode({
    title: "Bye!",
    messages :()=>[{
        message: "Bye!",
        sprite: "byeNPC"
    }],
    children : {},
    choices : ()=>null
});
export default const dialogRoot : DialogOptionTree  = {
    "testing":{
        "counter": new DialogNode({
            title: "I'm a testing npc",
            onVisit: (state:PlayerSave.PlayerSaveState) => ({...state, timesTalked : state.timesTalked + 1}),
            messages: (state: PlayerSave.PlayerSaveState) => [{
                message: "I'm a testing NPC!",
                sprite: "countingNPC"
            },{
                message:`I've been visited ${state.timesTalked} times!`,
                sprite: "countingNPC"
            },{
                message:"", //Sometimes you just need a dummy message to show only the options
                sprite:"countingNPC"
            }],
            children : {
                //This set of children should probably be rendered within messages for best UI, but I need a testing case okay
                "greet" : new DialogNode({
                    title: "I'm a testing npc",
                    messages: () => [{
                        message: "Nice to meet you!",
                        sprite: "countingNPC"
                    },{
                        //maybe make a message generator for this kind of message
                        message: <h1>What do you want to do?</h1>,
                        sprite: "countingNPC"
                    }],
                    choices: ()=>({
                        "Talk Again" : "../",
                        "Bye" : "root://bye"
                    }),
                    children:{}
                }),
                "regreet" : new DialogNode({
                    title: "I'm a testing npc",
                    messages: () => [{
                        message: "Nice to see you again!",
                        sprite: "countingNPC"
                    },{
                        //maybe make a message generator for this kind of message
                        message: <h1>What do you want to do?</h1>,
                        sprite: "countingNPC"
                    }],
                    choices: ()=>({
                        "Talk Again" : "../",
                        "Bye" : "root://bye"
                    }),
                    children:{}
                }),
                "regreet" : new DialogNode({
                    title: "I'm a testing npc",
                    messages: () => [{
                        message: "It's really creepy how you keep talking to me.",
                        sprite: "countingNPC"
                    },{
                        //maybe make a message generator for this kind of message
                        message: <h1>You've creeped them out and they won't talk to you anymore</h1>,
                        sprite: "countingNPC"
                    }],
                    choices: ()=>({
                        "Bye" : "root://bye"
                    }),
                    children:{}
                }),
            },
            choices: (state: PlayerSave.PlayerSaveState) => {
                if(state.timesTalked == 1){
                    return "./greet";
                }else if(state.timesTalked > 10){
                    return "./creepy";
                }else{
                    return "./regreet";
                }
            }
        })
    },
    //You can also reference objects, so they can be imported and shit
    "bye":byePlayer
}



//Should be of form root://path.to.dialog.node.root/dialog/nodes/navigation
export const navigate = (path:string) : DialogNode {
    if(path.startsWith("root://")){
        let current : any  = dialogRoot;
        let bits = path.split("/");
        bits.shift();
        bits.shift(); //gets rid of root://
        for(let rootBit of (bits.shift() || "").split(".")){
            //gets the dots path
            current = current[rootBit] as DialogOptionTree;
            //not guarenteed but if this fucks up it should be reproed pretty easily.
        }
        // Look this is blatant abuse of typescript so if it breaks just slap me or smthn idc
        return current as DialogNode;
    }else{
        console.error("Navigate failed! path was " + path);
        return  new DialogNode({
            title: "You done fucked up",
            messages : ()=> [
                {
                    message: (<p> Navigate failed! </p>),
                    sprite:"SadSprite"
                },
                {
                    message: (<p> Path was {path} </p>),
                    sprite:"SadSprite"
                },{
                    message: (<p> Check console for more</p>),
                    sprite:"SadSprite"
                },{
                    message: (<p> If you're seeing this as a player please tell us about it here (insert link later)</p>),
                    sprite:"SadSprite"
                }
            ],
            children:{},
            choices: (state) => null,
            onVisit: (state) => state,
        });

    }
}
