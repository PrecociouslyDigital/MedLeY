import * as React from 'react';
import Typist from 'react-typist';

export interface ChoicesProps{
    choices:string[];
    //TODO: Horrible, horrible name
    boundCallback:(path:string)=>null;
}

export const ChoiceOption : (props:{target: string, choiceCallback:(choice:string)}) => JSX.Element = ({target, choiceCallback}) =>
    (<p className='choice' onClick={()=>choiceCallback(target)}>
        {target}
    </p>);

export default class Choices extends React.Component <ChoicesProps,{shown:boolean}>{
    state = {shown:false};
    public render() {
        return (
            <div className='dialogBox'>
                <Typist onFinish={()=>this.setState({shown:true})}>{this.props.children}</Typist>

                {this.shownState ? 
                 this.props.choices.map(
                    (choice)=>
                    <ChoiceOption 
                        target={choice} 
                        choiceCallback={this.props.boundCallback}
                    />):
                 null
                 }
            </div>
        );
    }
}
