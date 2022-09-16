import {Text, View, StyleSheet, Alert} from 'react-native';
import Title from '../components/UI/Title';
import generateRandomBetween from '../random';
import {useState, useEffect} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'upper' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [
                {text: 'Sorry!', style: 'cancel'},
            ])
            return
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or lower?</Text>
                <View>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'upper')}>+</PrimaryButton>
                </View>
            </View>
            {/*LOG ROUNDS*/}

        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12
    }
});
