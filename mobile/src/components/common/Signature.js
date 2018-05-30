import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

class Signature extends Component {
  constructor(props){
    super(props);    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <SignatureCapture
              style={[styles.signature]}
              ref="sign"
              onSaveEvent={this._onSaveEvent.bind(this)}
              onDragEvent={this._onDragEvent}
              showNativeButtons={false}
            />
        </View>
      </View>
    )
  }

  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    this.refs["sign"].resetImage();
  }

  _onSaveEvent(result) {
    this.props.onSave && this.props.onSave(result);
  }

  _onDragEvent() {     
    // TODO if necessary

    console.log("dragged");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  signature: {
      height: 200,
  }
});

export { Signature };
