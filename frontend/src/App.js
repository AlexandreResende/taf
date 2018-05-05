import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Logo from './components/Logo';

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
          leftComponent={{ icon: 'home', color: '#fff', size: 30 }}
          centerComponent={<Text style={{ color: '#fff', margin: 0 }}>Avaliador: Vitor</Text>}
        />
        <Text>Some text here</Text>
      </View>
    );
  }
}

export default App;
