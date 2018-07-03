import {DialogNode} from './dialogHelpers';

export interface DialogOptionTree {
    [key:string] : DialogNode | DialogOptionTree;
}
export default const dialogRoot : DialogOptionTree  = {
    "counter":{
        
    }
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
