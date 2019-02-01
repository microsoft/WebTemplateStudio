import * as React from 'react';
import './App.css';
import './css/grid.css';

import Header from './components/Header';
import WizardForm from './components/WizardForm';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <UWPThemeProvider
        theme={getTheme({
          themeName: 'dark',
          accent: '#0078D7',
          useFluentDesign: true
        })}
      >
        <div className="container">
          <div>
            <Header 
              title="Web Template Studio"
              subheader="Welcome to the Web Template Studio Wizard"
            />
          </div>
          <WizardForm />
        </div>
      </UWPThemeProvider>
    );
  }
}

export default App;
