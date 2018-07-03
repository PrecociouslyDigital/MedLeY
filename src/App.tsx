import * as React from 'react';
import './App.css';
import DialogWrapper from './containers/DialogWrapper';
import { Provider } from 'react-redux';
import store from './store/store';


class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <DialogWrapper/>
      </Provider>
    );
  }
}

export default App;
