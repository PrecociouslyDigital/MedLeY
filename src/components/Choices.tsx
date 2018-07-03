import * as React from 'react';
import store from '../store/store';
import {SELECT_DIALOG} from '../actions/dialogActions';
export interface ChoicesProps{
    choices:{
        [key : string] : string;
    };
}

const ChoiceOption : React.PureComponent<{target: string}> = ({target})=>(
    <p className='choice' onClick={store.dispatch({
        type: SELECT_DIALOG,
        path:target
    })}>
       {target}
    </p>
)
export class Choices extends React.Component <ChoicesProps>{

    public render() {
        return (
            <div className='dialogBox'>
                {this.props.children}
                
            </div>
        );
    }
    public get
}
