import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Logo from './Logo';

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Avaliador: Victor",
    headerRight: <Logo />,
  };

  render() {
    return (
      <View>
        <Text>Ok</Text>
      </View>
    );
  }
}

export default HomeScreen;
