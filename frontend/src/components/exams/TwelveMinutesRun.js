import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import { Signature } from '../common';

class TwelveMinutesRun extends Component {

  saveImage() {
    this.refs.signature.saveSign();
  }

  resetImage(){
    this.refs.signature.resetSign();
  }

  onSave(result){
    console.log("Base64 encoded image: " + result.encoded);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{width: 600}}>
          <Signature ref='signature' onSave={this.onSave.bind(this)} />
        </View>
        <View style={{flex: 1,width: 100, height: 100}}>
          <Button 
            onPress={ () => this.saveImage() } 
            title="Salvar"
          />
          <Button 
            onPress={ () => this.resetImage() } 
            title="Limpar"
          />
        </View>
      </View>
    )
  }
}

export { TwelveMinutesRun };
