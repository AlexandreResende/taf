import React, { Component } from 'react';
import { View, Text, Easing, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Menu from '../menu/Menu';
import Logo from '../Logo';
import { TwelveMinutesRun } from '../exams';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />,
    headerLeft: <Icon name="menu" size={30} style={{ marginLeft: 10 }} />,
  });

  render (){
    return (
      <Menu component={<TwelveMinutesRun />} />
    );
  }
}

export default HomeScreen;
