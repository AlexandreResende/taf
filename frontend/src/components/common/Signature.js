import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

class Signature extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <SignatureCapture
              style={[styles.signature]}
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              showNativeButtons={true}
            />
        </View>
      </View>
    )
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
});

export { Signature };
