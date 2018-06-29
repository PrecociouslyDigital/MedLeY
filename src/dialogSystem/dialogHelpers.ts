import * as PlayerSave from '../reducers/playerSave';

import dialogRoot from './dialogRoot'
export interface DialogOption{
    title: string;
    messages : [Message];
    children : {
        [key : string] : DialogNode
    };
    choices : (state: PlayerSave.PlayerSaveState) => {
        [key:string] : string;
    } | string;
    onVisit: (state: Readonly<PlayerSave.PlayerSaveState>) => PlayerSave.PlayerSaveState;
}
export class DialogNode{
    private parentNode : DialogNode;
    get parent(): DialogNode {return this.parent;}
    private data : DialogOption;
    constructor(opts : DialogOption){
        this.data = opts;
        for(let key in this.data.children){
            this.data.children[key].parentNode = this;
        }
    }
    get root():DialogNode{
        let node : DialogNode = this;
        while(node.parentNode != null)
            node = node.parentNode;
        return node;
    } 
    resolveChoices(state: PlayerSave.PlayerSaveState) : {
        readonly [key: string] : DialogNode
    }{
        let data = this.data.choices(state);
        if(typeof data === "string"){
            return {
                "==>" : this.navigate(data)
            }
        }else{
            let result : {
                [key: string] : DialogNode
            } = {};
            for(let key in data){
                result[key] = this.navigate(key);
            }
            return result;
        }
    }
    navigate(path:string){
        const onlyDots = (testBit : string) => /\.+$/.test(testBit);
        let bits : string[] = path.split("/");
        let current : DialogNode = this;
        if(/\S/.test(bits[0])){
            bits.shift();
            current = this.root;
        }
        if(/\S/.test(bits[bits.length-1])){
            bits.pop();
        }
        for(let bit of bits){
            if(onlyDots(bit)){
                for(let i = 1; i < bit.length; i++){
                    current = current.parent;
                }
            }else{
                current = current.data.children[bit]
            }
        }
        return current;
    }
}

export interface RenderedDialogNode {
    readonly choices : {
        readonly [key: string] : DialogNode
    }
    readonly title: string;
    readonly messages : [Message];
}

export interface Message {
    message: JSX.Element;
    sprite: string;
}
