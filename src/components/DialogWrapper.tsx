import * as React from 'react';

import Choices from './Choices';
import { RenderedDialogNode } from '../dialogSystem/dialogHelpers';
import * as DialogActions from '../actions/dialogActions';
import * as UIState from '../actions/uiState';
import DialogLog from './DialogLog';

export const DialogWrapperWrapper = (props:{dialog?: RenderedDialogNode, index:number,dispatch: ({type:string})=>void}) : JSX.Element => {
    if(props.dialog == null) return <div/>;
    //TODO: add title and sprites soon
    if(props.index < props.dialog.messages.length-1){
        return (<DialogLog onFinish={()=>props.dispatch(UIState.nextMessageAction())} key={props.index}>
                           {props.dialog.messages[props.index].message}
                </DialogLog>);
    }else if (props.index === props.dialog.messages.length-1){
        return (<Choices choices={Object.keys(props.dialog.choices)} boundCallback={(path:string) =>
            props.dispatch(
                DialogActions.moveDialogAction(path)
            )}>
            {props.dialog.messages[props.index].message}
        </Choices>);
    }else{
        console.error("Dialog Index out of range");
        return (<div> I don't know what you did but it broke something. Check console for more.</div>);
    }
}
