import React, { Component } from 'react';
import { View, Text, Easing, StyleSheet, Button } from 'react-native';
import { Logo } from '../common';
import { FiftyMetersRun } from '../exams';

class FiftyMetersRunScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  render (){
    return (
      <FiftyMetersRun navigation={this.props.navigation}/>
    );
  }
}

export { FiftyMetersRunScreen };
