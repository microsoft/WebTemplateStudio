import { StyleSheet } from 'react-native';

//TODO Review names
//TODO see if we prefer several css per type
export default StyleSheet.create({
    contentCenter:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentLeft: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 15,
    },
    sectionLeft: {
        paddingVertical: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    text: {
        fontSize: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    subtitle: {
        fontSize: 16,
    },
    icon: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    link: {
        textDecorationLine: 'underline',
    },
});
