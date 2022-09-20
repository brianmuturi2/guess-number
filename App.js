import { ImageBackground, StyleSheet, SafeAreaView, Platform } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import {useState} from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontsLoaded) {
      return <AppLoading/>
  }

  function pickedNumberHandler(pickedNumber) {
      setUserNumber(pickedNumber);
      setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
      setGameIsOver(true);
      setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
      setUserNumber(null);
      setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if (userNumber) {
      screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }

  if (userNumber && gameIsOver) {
      screen = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler}/>
  }

  return (
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={style.rootScreen}>
          <ImageBackground
              source={require('./assets/background.png')}
              resizeMode="cover"
              style={style.rootScreen}
              imageStyle={style.backgroundImage}
          >
              <SafeAreaView style={[style.rootScreen, style.androidContainer]}>
                  {screen}
              </SafeAreaView>
          </ImageBackground>
      </LinearGradient>
  );
}

const style = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  },
  androidContainer: {
    paddingTop: Platform.OS === 'android' ? 35 : 0
  }
});
