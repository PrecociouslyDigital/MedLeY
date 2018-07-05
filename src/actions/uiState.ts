import * as DialogActions from './dialogActions';
import reduceReducers from 'reduce-reducers';
import { Reducer } from 'redux';

export interface UIState{
    messageIndex:number;
}

export const defaultUIState = {
    messageIndex:0
}

export const NEXT_MESSAGE = 'NEXT_MESSAGE';
export type NEXT_MESSAGE = typeof NEXT_MESSAGE;

export interface Next_Message{
    type : NEXT_MESSAGE;
}

export const nextMessageAction = () : Next_Message => ({
    type : NEXT_MESSAGE,
});

const nextMessageReducer = (state: UIState = defaultUIState, action: Next_Message) : UIState => action.type ===NEXT_MESSAGE ? ({
    ...state,
    messageIndex : state.messageIndex + 1
}) : state

const resetMessageReducer = (state: UIState = defaultUIState, action: DialogActions.Select_Dialog) : UIState => action.type ===DialogActions.SELECT_DIALOG ? ({
    ...state,
    messageIndex : 0
}) : state

export const UIReducer = reduceReducers(nextMessageReducer,resetMessageReducer) as Reducer<UIState>;