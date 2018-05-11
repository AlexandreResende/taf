import React, { Component } from 'react';
import { } from 'react-native';
import { } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { LoginScreen, HomeScreen, Logo } from './components/';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
        headerRight: <Logo />,
      }),
    },
    Login: LoginScreen
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
