import React, { Component } from 'react';
import { } from 'react-native';
import { } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { LoginScreen, HomeScreen, TwelveMinutesRunScreen, HeightExamScreen } from './components/screens'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    TwelveMinutesRun: TwelveMinutesRunScreen,
    HeightExam: HeightExamScreen
  },
  {
    initialRouteName: 'Login',
  },
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
