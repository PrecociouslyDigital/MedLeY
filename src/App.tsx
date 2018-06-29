import * as React from 'react';
import './App.css';
import DialogueLog from './components/DialogLog';

class App extends React.Component {
  public render() {
    return (
      <DialogueLog>
          <p>I have dialogue!</p>
          <DialogueLog.Delay ms={500} />
          <p>I delay!</p>
          <p>(click to skip)This takes foreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeevvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee<DialogueLog.Delay ms={1000} />eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrr</p>
      </DialogueLog>
    );
  }
}

export default App;
