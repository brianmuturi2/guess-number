import { ImageBackground, StyleSheet } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient';

export default function App() {
  return (
      <LinearGradient colors={['#4e0329', '#ddb52f']} style={style.rootScreen}>
          <ImageBackground
              source={require('./assets/background.png')}
              resizeMode="cover"
              style={style.rootScreen}
              imageStyle={style.backgroundImage}
          >
              <StartGameScreen/>
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
