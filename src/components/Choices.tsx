import * as React from 'react';
import DialogLog from './DialogLog';

export interface ChoicesProps{
    choices:string[];
    //TODO: Horrible, horrible name
    boundCallback:(path:string)=>void;
}

export const ChoiceOption : (props:{target: string, choiceCallback:(choice:string)=>void}) => JSX.Element = ({target, choiceCallback}) =>
    (<p className='choice' onClick={()=>choiceCallback(target)}>
        {target}
    </p>);

export default class Choices extends React.Component <ChoicesProps,{shown:boolean}>{
    state = {shown:false};
    public render() {
        return (
                <DialogLog onFinish={()=>this.setState({shown:true})} ><p>{this.props.children}</p>

                {this.props.choices.map(
                    (choice)=>
                    <ChoiceOption 
                        target={choice} 
                        choiceCallback={this.props.boundCallback}
                    />)}
                </DialogLog>
        );
    }
}
