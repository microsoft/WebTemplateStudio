import React, { useState, useEffect } from "react";

// What approach is best with React Native to deal with Themes?
// https://es.reactjs.org/docs/context.html#when-to-use-context
// https://github.com/expo/react-native-appearance
export const Context = React.createContext('light');

export class ThemeProvider extends React.Component {
    state = {
        theme: "light",
        setTheme: (theme) => {
            this.setState({ theme: theme })
        }
    }
    render() {
        const { theme } = this.state
        return (
            <Context.Provider value={this.state} theme={theme} >
                { this.props.children}
            </Context.Provider>
        )
    }
}

export default ThemeProvider;