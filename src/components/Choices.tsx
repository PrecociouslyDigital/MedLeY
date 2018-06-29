import * as React from 'react';
import * as Actions from '../actions/dialogActions';
export interface ChoicesProps{
    choices:{
        [key : string] : string;
    };
}

const ChoiceOption : React.PureComponent<{target: string}> = ({target})=>(
    <p className='choice' onClick={}>
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
