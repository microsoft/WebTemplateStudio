import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from './styles.module.css';

import Welcome from './components/Welcome';
import Header from './components/Header';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Header />
          <div className={styles.container}>
            <div className={styles.leftView} />
            <div className={styles.centerView}>
              <Switch>
                <Route path="/" component={Welcome} />
              </Switch>
            </div>
            <div className={styles.rightView} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
