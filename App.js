import { ImageBackground, StyleSheet } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import {useState} from 'react';

export default function App() {

  const [userNumber, setUserNumber] = useState();

  function pickedNumberHandler(pickedNumber) {
      setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if (userNumber) {
      screen = <GameScreen/>
  }

  return (
      <LinearGradient colors={['#4e0329', '#ddb52f']} style={style.rootScreen}>
          <ImageBackground
              source={require('./assets/background.png')}
              resizeMode="cover"
              style={style.rootScreen}
              imageStyle={style.backgroundImage}
          >
              {screen}
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
  }
});
