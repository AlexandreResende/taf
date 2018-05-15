import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Signature } from '../common';

class TwelveMinutesRun extends Component {
  render() {
    return (
      <View style={{width: 600}}>
        <Signature/>
      </View>
    )
  }
}

export { TwelveMinutesRun };
