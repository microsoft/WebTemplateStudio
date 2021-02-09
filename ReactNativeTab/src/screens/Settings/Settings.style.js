import { StyleSheet } from "react-native";

import appStyles from '../../app.styles';

export const getStyles = (theme) => StyleSheet.create({
    ...appStyles,
    contentLeft: {
        ...appStyles.contentLeft,
        backgroundColor: theme.colors.background,
    },
    sectionLeft:{
        ...appStyles.sectionLeft,
        backgroundColor: theme.colors.background,
    },
    title:{
        ...appStyles.title,
        color: theme.colors.text,
    },
    text:{
        ...appStyles.text,
        color: theme.colors.text,
    },
    link:{
        ...appStyles.link,
        color: theme.colors.primary,
    }
});