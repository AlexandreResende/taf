import React, { Component } from 'react';
import { Logo } from '../common';
import { View, Text, Easing, StyleSheet, Button } from 'react-native';

class SynchronizeDataScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  render (){
    return (
      <View>
        <Text>Sincronizando dados!!!!</Text>
      </View>
    );
  }
}

export { SynchronizeDataScreen };
