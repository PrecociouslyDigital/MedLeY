import * as React from 'react';
export interface ChoicesProps{
    choices:string[];
    //TODO: Horrible, horrible name
    boundCallback:(path:string)=>null;
}

export const ChoiceOption : (props:{target: string, choiceCallback:(choice:string)}) => JSX.Element = ({target, choiceCallback}) =>
    (<p className='choice' onClick={()=>choiceCallback(target)}>
        {target}
    </p>);

export default class Choices extends React.Component <ChoicesProps>{

    public render() {
        return (
            <div className='dialogBox'>
                {this.props.children}

                {this.props.choices.map(
                    (choice)=>
                    <ChoiceOption 
                        target={choice} 
                        choiceCallback={this.props.boundCallback}
                    />)}
            </div>
        );
    }
}
