export abstract class DialogNode{
    children : {
        [key : string] : DialogNode
    };
    private parentNode : DialogNode;
    abstract onVisit();
    get parent(): DialogNode {return this.parent;}
    title: string;
    messages : [Message];
    choices : (state: StoreState) => {
        [key:string] : string;
    } | string;
    constructor(){
        for(let key in this.children){
            this.children[key].parentNode = this;
        }
    }
    get root():DialogNode{
        let node : DialogNode = this;
        while(node.parentNode != null)
            node = node.parentNode;
        return node;
    } 
}

export function navigate(path: string, context:DialogNode){
    const onlyDots = (testBit : string) => /\.+$/.test(testBit);
    let bits : string[] = path.split("/");
    let current : DialogNode = context;
    if(/\S/.test(bits[0])){
        bits.shift();
        current = context.root;
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
            current = current.children[bit]
        }
    }
    return current;
}

export interface Message {
    message: JSX.Element;
    sprite: string;
}
