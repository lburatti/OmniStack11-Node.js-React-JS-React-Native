import { StyleSheet } from 'react-native';
// importando constants -> pacote "expo install expo-constants"
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24, // nas laterais
        paddingTop: Constants.statusBarHeight + 20, // identifica o tamanho e acrescenta o valor 
    },
    
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
    headerText: {
        fontSize: 15,
        color: '#737380'
    },
    
    headerTextBold: {
        fontWeight: 'bold'
    },
    
    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },
    
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },
    
    incidentList: {
        marginTop: 32
    },
    
    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },
    
    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
    
    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detailsButtonText: {
        color: '#E02041',
        fontSize: 15,
        fontWeight: 'bold'
    },

});
