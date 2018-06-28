import * as React from 'react';
import './App.css';
import DialogueLog from './components/DialogLog';
import Typist from 'react-typist';

class App extends React.Component {
  public render() {
    return (
      <DialogueLog>
          <p>I have dialogue!</p>
          <Typist.Delay ms={500} />
          <p>I delay!</p>
          <p>I type gud!<Typist.Backspace count={4} delay={200} />well!</p>
          <p>(click to skip)This takes foreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeevvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee<Typist.Delay ms={1000} />eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrr</p>
      </DialogueLog>
    );
  }
}

export default App;
