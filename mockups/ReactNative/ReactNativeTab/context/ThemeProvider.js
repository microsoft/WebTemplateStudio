import React, { createContext, useState } from "react";

// What approach is best with React Native to deal with Themes?
// https://es.reactjs.org/docs/context.html#when-to-use-context
// https://github.com/expo/react-native-appearance
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
