import React, { Component } from 'react';
import { View, Text, Easing, StyleSheet, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/Entypo';
// import Menu from '../menu/Menu';
import { Logo } from '../common';
import { HeightExam } from '../exams';

class HeightExamScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Logo />
  });

  render (){
    return (
      <HeightExam />
    );
  }
}

export { HeightExamScreen };
