import React, { useEffect } from "react";

import { Button, StatusBar } from "react-native";

import useThemeContext from "../hooks/useThemeContext";
import themes from "../themes";

export default function ToggleTheme() {
    const { theme, setTheme } = useThemeContext();
    const selectedTheme = themes[theme];

    //TODO: not sure if we need/can do something here
    useEffect(() => {
        console.log("theme has changed to " + theme)
        //needs to change the theme in the App
        return () => {
            // cleanup
        }
    }, [theme])

    const toggleTheme = () => {
        //TODO: investigate if need to add StatusBar and change style here. Seems to be doing ok on emulator though.
        //StatusBar.setBarStyle("dark-content|light-content")
        if (theme == "light") {
            setTheme("dark");

        } else {
            setTheme("light");
        }
    };

    return (
        <Button
            onPress={toggleTheme}
            aria-accessibilityLabel="Change Theme"
            title={theme === "dark" ? "Set light theme" : "Set dark theme"}
        >
        </Button>
    );
};