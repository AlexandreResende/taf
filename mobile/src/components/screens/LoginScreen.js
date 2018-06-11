import React, { Component } from 'react';
import { View, Button, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { Signature } from '../common';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  loginValidator(image) {
    if(this.state.name.length > 0 && image != null){
      this.props.navigation.navigate('Home', {
        name: this.state.name,
        appraiserSignature: image.encoded
      })
    } else {
      Alert.alert("Nome e assinatura devem ser preenchidos")
    }
  }

  onSave(result){
    this.loginValidator(result);
  }

  saveImage() {
    this.refs.signature.saveSign();
  }

  resetImage(){
    this.refs.signature.resetSign();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 150, height: 150 }}
          source={ require('../../images/pm.png') }
        />
        <View style={styles.centerBox}>
          <TextInput
            placeholder="Nome"
            onChangeText={(text) => { this.setState({ name: text }); }}
          />
          <Signature ref='signature' onSave={this.onSave.bind(this)} />
          <Button 
            style={styles.button}
            onPress={ () => this.resetImage() } 
            title="Limpar Assinatura"
          />

          <Button
            title="Entrar"
            onPress={ this.saveImage.bind(this) }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centerBox: {
    borderWidth: 1,
    borderRadius: 10,
    width: 550,
    height: 250,
  },
  button: {
    width: 100
  }
});

export { LoginScreen };
