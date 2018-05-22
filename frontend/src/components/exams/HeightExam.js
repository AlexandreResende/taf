
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

class HeightExam extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Avaliador: Alexandre</Text>
        <Text>Número do Avaliado: 1</Text>
        <TextInput style={styles.formatHeight} keyboardType='numeric'>cms.</TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formatHeight: {
    borderColor: 'black',
  }
});


export { HeightExam };
