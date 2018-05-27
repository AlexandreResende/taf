import React, { Component } from 'react';
import { View, Text, Easing, StyleSheet, Button } from 'react-native';
import { Logo } from '../common';
import { AbdominalExam } from '../exams';

class AbdominalExamScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  render() {
    return (
      <AbdominalExam />
    );
  }
}

export { AbdominalExamScreen };
