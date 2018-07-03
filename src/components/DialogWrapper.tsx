import * as React from 'react';

import Choices from './Choices';
import { RenderedDialogNode } from '../dialogSystem/dialogHelpers';
import DialogLog from './DialogLog';

export default class DialogWrapper extends React.Component<{dialog: RenderedDialogNode, moveActionCreator : (path:string)=>null},{index:number}>{
    state = {index:0};
    public render(){
        if(this.props.dialog == null) return null;
        //TODO: add title and sprites soon
        if(this.state.index < this.props.dialog.messages.length-1){
            return (<DialogLog onFinish={()=>
                                this.setState({
                                    index:this.state.index + 1
                                    //Single prop statessssss
                                 })
                           }>
                               {this.props.dialog.messages[this.state.index]}
                    </DialogLog>);
        }else if (this.state.index === this.props.dialog.messages.length-1){
            return (<Choices choices={Object.keys(this.props.dialog.choices)} boundCallback={this.props.moveActionCreator}>this.props.dialog.messages[this.state.index]</Choices>);
        }else{
            console.error("Dialog Index out of range");
            return (<div> I don't know what you did but it broke something. Check console for more.</div>);
        }
    }
    //TODO: Ideally figure out some key finangalling; maybe another container component *shudder*
    static getDerivedStateFromProps(oldState, newState){
        return oldState !== newState ? {index:0}
    }
}
