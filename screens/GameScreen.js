import {Text, View, StyleSheet, Alert, FlatList} from 'react-native';
import Title from '../components/UI/Title';
import generateRandomBetween from '../random';
import {useState, useEffect} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';
import {Ionicons} from '@expo/vector-icons';

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

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
        setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds])
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.actionButtonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'upper')}>
                            <Ionicons name="md-add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View>
                {guessRounds.map(round => <Text key={round}>{round}</Text>)}
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <Text>{itemData.item}</Text>}
                    keyExtractor={(item) => item}
                />
            </View>

        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12
    },
    actionButtonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12
    }
});
