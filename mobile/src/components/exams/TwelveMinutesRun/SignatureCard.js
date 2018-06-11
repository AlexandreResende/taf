import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Signature } from '../../common';
import CardView from 'react-native-cardview';
import { Button } from 'react-native-elements'

class SignatureCard extends Component {
  constructor(props){
    super(props);
  }

  onSave = (result) => {
      this.props.saveData(this.props.number,this.props.laps,this.props.meters,result.encoded)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Numero do Candidato: {this.props.number}</Text>
        <Text>Voltas do Candidato: {this.props.laps}</Text>
        <Text>Metros adicionais do Candidato: {this.props.meters}</Text>
        <Signature saveOnDrag={true} onSave={this.onSave} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: '30%',
        margin: 20,
        padding: 10,
        borderWidth: 3,
        borderRadius: 10
    }
});

export { SignatureCard };
