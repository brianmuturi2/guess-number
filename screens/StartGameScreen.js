import {TextInput, View, StyleSheet} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen() {
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} maxLength={2} keyboardType={'number-pad'} />
            <View style={styles.actionButtonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Rest</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Confirm</PrimaryButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
   inputContainer: {
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 100,
       marginHorizontal: 24,
       padding: 16,
       backgroundColor: '#4e0329',
       borderRadius: 8,
       elevation: 20,
       shadowColor: 'black',
       shadowOffset: {width: 0, height: 2},
       shadowRadius: 6,
       shadowOpacity: 0.25
   },
    input: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 1,
        color: '#ddb52f',
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    actionButtonsContainer: {
       flexDirection: 'row'
    },
    buttonContainer: {
       flex: 1
    }
});

export default StartGameScreen;
