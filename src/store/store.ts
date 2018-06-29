import * as DialogHelpers from '../dialogSystem/dialogHelpers';
import * as PlayerSave from '../reducers/playerSave';
import { createStore, combineReducers } from 'redux';

export interface StoreState {
    currentConversation?: DialogHelpers.RenderedDialogNode;
    playerState : PlayerSave.PlayerSaveState;
}

export const store = createStore<StoreState>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});
