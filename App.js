import { ImageBackground, StyleSheet, SafeAreaView, Platform } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import {useState} from 'react';
import Colors from './constants/colors';

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
