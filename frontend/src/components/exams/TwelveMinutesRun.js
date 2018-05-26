import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import { Signature } from '../common';
import { Card } from './TwelveMinutesRun/index';

class TwelveMinutesRun extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection:'row' ,flexWrap: 'wrap'}}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export { TwelveMinutesRun };
