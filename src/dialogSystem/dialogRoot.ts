import {DialogNode} from './dialogHelpers';

interface DialogOptionTree {
    [key:string] : DialogNode | DialogOptionTree;
}
export default const dialogRoot : DialogOptionTree  = {
    "counter":{
        
    }
}
