import React, { Component } from 'react';
import { } from 'react-native';
import { } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  HomeScreen,
  TwelveMinutesRunScreen,
  HeightExamScreen,
  PushUpsExamScreen,
  AbdominalExamScreen,
  FiftyMetersRunScreen,
  TwelveMinutesRunEndScreen,
  ListCandidatesInfoScreen
} from './components/screens'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    TwelveMinutesRun: TwelveMinutesRunScreen,
    TwelveMinutesRunEnd: TwelveMinutesRunEndScreen,
    HeightExam: HeightExamScreen,
    PushUpsExam: PushUpsExamScreen,
    AbdominalExam: AbdominalExamScreen,
    FiftyMetersRun: FiftyMetersRunScreen,
    ListCandidatesInfo: ListCandidatesInfoScreen,
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
