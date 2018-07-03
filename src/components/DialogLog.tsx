import * as React from 'react';
import Typist from 'react-typist';
import PropTypes from 'prop-types';

//TODO: Add backspacing
export default class DialogLog extends React.Component <{
    onFinish?: PropTypes.func,
},{
    typing:boolean,
}>{
    state = {
        typing : true
    }
    static Delay = Typist.delay;
    finishTyping = ()=>{
        this.setState({typing:false})
    }

    public render() {
        return (
            <div className='dialogBox'>
                {this.state.typing
                ?
                    <div onClick={this.finishTyping} className='dialog'>
                        <Typist cursor={{show:false}} onTypingDone={this.finishTyping}>
                            {this.props.children}
                        </Typist>
                    </div>
                :
                    <div onClick={this.props.onFinish} className='dialog'>
                       
                       {this.props.children}
                    </div>
                }
            </div>
        );
    }
}
