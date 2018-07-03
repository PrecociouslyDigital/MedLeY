import * as DialogHelpers from '../dialogSystem/dialogHelpers';
import * as DialogActions from '../actions/dialogActions';
import * as PlayerSave from '../reducers/playerSave';
import { createStore } from 'redux';

export interface StoreState {
    currentConversation?: DialogHelpers.RenderedDialogNode;
    playerState : PlayerSave.PlayerSaveState;
}

const coreReducer = (state: StoreState, action : DialogActions.Select_Dialog) : StoreState => {
    return DialogActions.moveDialogReducer(state, action);
}

export default const store = createStore<StoreState, {type:string}, any, any>(coreReducer,{
    playerState : {
        timesTalked : 0
    }
});
