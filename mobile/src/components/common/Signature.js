import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

class Signature extends Component {
  constructor(props){
    super(props);    
  }
  
  componentDidMount(){
    this.setState({
      touched: false
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <SignatureCapture
              style={[styles.signature]}
              ref="sign"
              onSaveEvent={this._onSaveEvent.bind(this)}
              onDragEvent={this._onDragEvent.bind(this)}
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
    this.setState({
      touched: false
    })
  }

  _onSaveEvent(result) {
    if(this.state.touched)
      this.props.onSave(result);
    else
      this.props.onSave(null);
  }

  _onDragEvent() {
    if(this.props.saveOnDrag)
      this.saveSign();
    this.setState({
      touched: true
    })
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
