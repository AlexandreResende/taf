import React, { Component } from 'react';
import { View, Text, Easing, StyleSheet, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/Entypo';
// import Menu from '../menu/Menu';
import { Logo } from '../common';
import { FiftyMinutesRunScreen } from '../exams';

class FiftyMinutesRunScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  render (){
    return (
      <FiftyMinutesRun />
    );
  }
}

export { FiftyMinutesRunScreen };
