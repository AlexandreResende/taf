import React, { Component } from 'react';
import { View, Text, Easing, StyleSheet, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/Entypo';
// import Menu from '../menu/Menu';
import Logo from '../Logo';
import { TwelveMinutesRun } from '../exams';

class TwelveMinutesRunScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  render (){
    return (
      <TwelveMinutesRun />
    );
  }
}

export default TwelveMinutesRunScreen;
