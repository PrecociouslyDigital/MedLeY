import {StoreState} from '../store/store';
import * as Dialog from '../dialogSystem/dialogHelpers';
import {navigate} from '../dialogSystem/dialogRoot';


export const SELECT_DIALOG = 'SELECT_DIALOG';
export type SELECT_DIALOG = typeof SELECT_DIALOG;

export interface Select_Dialog{
    type : SELECT_DIALOG;
    path : string;
}

export const moveDialogAction = (path)=> {
    type : SELECT_DIALOG;
    path : path;
}

export const moveDialogReducer = (state: StoreState, action: Select_Dialog) : StoreState => {
    let nextNode : Dialog.DialogNode | null;
    if(state.currentConversation!=null){
        nextNode = state.currentConversation.choices[action.path];
    } else{
        nextNode = navigate(action.path);
    }
    if(nextNode == null){
        return {
            ...state,
            currentConversation: undefined
        }
    }
    let playerState = nextNode.data.onVisit==null ? state.playerState : nextNode.data.onVisit(state.playerState);
    let currentConversation = nextNode.renderDialogNode(playerState);
    return {    
        ...state,
        currentConversation,
        playerState
    }
}
