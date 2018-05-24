import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Signature } from '../common';

class TwelveMinutesRun extends Component {

  save(result){
    console.log(result.encoded)
  }

  render() {
    return (
      <View style={{width: 600}}>
        <Signature onSave={ this.save.bind(this) } />
      </View>
    )
  }
}

export { TwelveMinutesRun };
