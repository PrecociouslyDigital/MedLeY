import * as React from 'react';
import * as Actions from '../actions/dialogActions';
export interface ChoicesProps{
    choices:{
        [key : string] : string;
    };
}

const ChoiceOption : React.PureComponent<{target: Actions.SelectDialog}> = ({target, children})=>(
    <p className='choice' onClick={}>
       {children}
    </p>
)
class Choices extends React.Component <ChoicesProps>{

    public render() {
        return (
            <div className='dialogBox'>
                {this.props.children}
                
            </div>
        );
    }
    public get
}
