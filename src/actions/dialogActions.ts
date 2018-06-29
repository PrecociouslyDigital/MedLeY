import {StoreState} from '../store/store';
import * as Dialog from '../dialogSystem/dialogHelpers';


export const SELECT_DIALOG = 'SELECT_DIALOG';
export type SELECT_DIALOG = typeof SELECT_DIALOG;

export interface Select_Dialog{
    type : SELECT_DIALOG;
    path : string;
}

const moveDialog = (state: StoreState, action: Select_Dialog) : StoreState => {
    let nextNode : Dialog.DialogNode;
    if(state.currentConversation!=null){
        nextNode = state.currentConversation.choices[action.path];
    } 
}
