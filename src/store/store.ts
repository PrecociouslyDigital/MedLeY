import * as DialogActions from '../actions/dialogActions';

import * as UIState from '../actions/uiState';
import { createStore, combineReducers } from 'redux';

export interface StoreState {
    gameState : DialogActions.GameState;
    uiState : UIState.UIState;
}

const coreReducer = combineReducers({
    gameState: DialogActions.moveDialogReducer,
    uiState: UIState.UIReducer
});


const store = createStore<StoreState, {type:string}, any, any>(coreReducer,{
    gameState: DialogActions.defaultGameState,
    uiState : UIState.defaultUIState
},window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]());

export default store;
