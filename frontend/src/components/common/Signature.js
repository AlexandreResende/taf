import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

class Signature extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <SignatureCapture
              style={[styles.signature]}
              ref="sign"
              onSaveEvent={ (result) => { this.props.onSave(result) } }
              onDragEvent={this._onDragEvent}
              showNativeButtons={false}
            />

          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableHighlight style={styles.buttonStyle}
                onPress={() => { this.saveSign() } } >
                <Text>Salvar</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.buttonStyle}
                onPress={() => { this.resetSign() } } >
                <Text>Limpar</Text>
            </TouchableHighlight>
          </View>
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
    // TODO

    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result.encoded);
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
  },
  buttonStyle: {
    flex: 1, justifyContent: "center", alignItems: "center", height: 50,
    backgroundColor: "#eeeeee",
    margin: 10
  }
});

export { Signature };
