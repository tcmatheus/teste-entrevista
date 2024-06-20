import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create ({
    scrollView: {
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    container: {
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    h1 : {
        color: '#000',
        fontSize: 27,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    h2 : {
        color: '#999',
        fontSize: 15,
    },
    inputArea: {
        width: '100%',
        paddingTop: 20,

    },
    inputLabel: {
        color: '#777',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    inputField: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#DDD',
        fontSize: 15,
        padding: 10,
    },
    aditionals: {
        width: '100%',
    },
    forgotBtnArea: {
        paddingVertical: 20,
        alignSelf: 'flex-end',
    },
    forgotBtnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4162B7',
    },
    button: {
        backgroundColor: '#4162B7',
        width: '100%',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        alignSelf: 'center',
        color: '#FFF',
        fontSize: 16,
    },
    signUpArea: {
        flexDirection: 'row',
        marginTop: 30,
    },
    signUpText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#999',
    },
    signUpBtnText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#4162B7',
        marginLeft: 5,
    },
    footerArea: {
        marginVertical: 30,
    },
    footerText: {
        color: '#999',
        fontSize: 13,
    },
});
