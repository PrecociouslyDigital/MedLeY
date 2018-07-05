import * as PlayerSave from '../actions/playerSave';
import * as DialogRoot from '../dialogSystem/dialogRoot';


export interface DialogOption{
    title: string;
    messages : (state: Readonly<PlayerSave.PlayerSaveState>)=>Message[];
    children : {
        [key : string] : DialogNode
    };
    choices : (state: PlayerSave.PlayerSaveState) => {
        [key:string] : string;
    } | string | null;
    onVisit?: (state: Readonly<PlayerSave.PlayerSaveState>) => PlayerSave.PlayerSaveState;
}
export class DialogNode{
    private parentNode : DialogNode;
    get parent(): DialogNode {return this.parentNode;}
    readonly data : DialogOption;
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
        readonly [key: string] : DialogNode | null
    }{
        let data = this.data.choices(state);
        if(data == null){
            return{
                "==>" : null
            }
        }else if(typeof data === "string"){
            return {
                "==>" : this.navigate(data)
            }
        }else{
            let result : {
                [key: string] : DialogNode | null
            } = {};
            for(let key in data){
                result[key] = this.navigate(data[key]);
            }
            return result;
        }
    }
    navigate(path:string) : DialogNode | null{
        if(path.startsWith("root://")){
            return DialogRoot.navigate(path);
        }
        const onlyDots = (testBit : string) => /^\.+$/.test(testBit);
        let bits : string[] = path.split("/");
        let current : DialogNode = this;
        if(/^\s+$/.test(bits[0])){
            bits.shift();
            current = this.root;
        }
        if(bits.length > 1 && (/^\s+$/.test(bits[bits.length-1]) || bits[bits.length-1] === "")){
            bits.pop();
        }
        for(let bit of bits){
            if(onlyDots(bit)){
                for(let i = 1; i < bit.length; i++){
                    current = current.parent || current;
                }
            }else{
                current = current.data.children[bit]
            }
        }
        return current;
    }
    renderDialogNode(context : PlayerSave.PlayerSaveState) : RenderedDialogNode {
        return {
            choices: this.resolveChoices(context),
            title: this.data.title,
            messages: this.data.messages(context)
        }
    }
}

export interface RenderedDialogNode {
    readonly choices : {
        readonly [key: string] : DialogNode | null
    }
    readonly title: string;
    readonly messages : Message[];
}

export interface Message {
    message: React.ReactNode;
    sprite: string;
}
