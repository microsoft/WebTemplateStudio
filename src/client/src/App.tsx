import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Welcome from './components/Welcome';
import Card from './components/Card';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route path="/" component={Welcome} />
      </Router>
    );
  }
}

export default App;
