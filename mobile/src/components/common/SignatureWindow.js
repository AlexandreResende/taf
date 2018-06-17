import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
import { Signature } from './';

class SignatureWindow extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      showSignatureWindow: false,
    };
  }

  // zeroFill( number, width )
  // {
  //   width -= number.toString().length;
  //   if ( width > 0 )
  //   {
  //     return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  //   }
  //   return number + ""; // always return a string
  // } 

  render()
  {
    return (   
      <Modal visible={true} animationType="slide" 
      transparent={false}
      onRequestClose={() => { this.onSignatureClose }}>        
        <View style={[styles.container, { marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }]}>
          <Text style={styles.formatText}>Assinatura do candidato</Text>
          <View style={styles.signatureBox}>
            <Signature ref='signature' onSave={this.props.onSave.bind(this)} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title='Limpar' onPress={() => { this.refs.signature.resetSign(); }} />
            <View style={{ width: 20 }} />
            <Button title='Salvar' onPress={() => { this.setState((prevState) => { return { showSignatureWindow: false } }); }} />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureBox: {
    marginTop:10,
    borderWidth: 1,
    borderRadius: 10,
    width: 550,
    height: 205,
  },
  formatText: {
    color: 'black',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

});

export { SignatureWindow};