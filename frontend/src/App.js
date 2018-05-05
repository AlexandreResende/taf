import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Logo } from './components/';

/*
  using react-native-elements and react-native-vector-icons
  https://github.com/react-native-training/react-native-elements
  https://github.com/oblador/react-native-vector-icons
*/

class App extends Component {
  render() {
    return (
      <View>
        <Header
          rightComponent={<Logo />}
          leftComponent={{ icon: 'menu', color: '#fff', size: 30 }}
          centerComponent={<Text style={styles.rightComponentStyle}>Avaliador: Victor</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightComponentStyle: {
    color: '#fff',
    margin: 0,
  },
});

export default App;
