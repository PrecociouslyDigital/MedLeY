import * as Dialog from '../dialogSystem/dialogHelpers';
import {navigate} from '../dialogSystem/dialogRoot';

import * as PlayerSave from '../actions/playerSave';
import * as DialogHelpers from '../dialogSystem/dialogHelpers';

export const SELECT_DIALOG = 'SELECT_DIALOG';
export type SELECT_DIALOG = typeof SELECT_DIALOG;

export interface Select_Dialog{
    type : SELECT_DIALOG;
    path : string;
}

export const moveDialogAction = (givenPath : string) : Select_Dialog => ({
    type : SELECT_DIALOG,
    path : givenPath
});
export interface GameState  {
        currentConversation?: DialogHelpers.RenderedDialogNode;
        playerState : PlayerSave.PlayerSaveState;
}
export const defaultGameState = {
    playerState:{
        timesTalked:0
    }
}
export const moveDialogReducer = (state: GameState = defaultGameState, action: Select_Dialog) : GameState => {
    if(action.type !==SELECT_DIALOG) return state;
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
