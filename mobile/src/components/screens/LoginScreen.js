import React, { Component } from 'react';
import { Modal, Text, View, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { Signature } from '../common';
import { Button } from 'react-native-elements';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = 
    { 
      name: '',
      showSignatureWindow: false,
    };
  }

  loginValidator(image) {
    if(this.state.name.length > 0 && image != null)
    {
      this.props.navigation.navigate('Home', {
        name: this.state.name,
        appraiserSignature: image.encoded
      })
    } else {
      Alert.alert("Nome e assinatura devem ser preenchidos")
    }
  }

  onSave(result){
    this.setState((prevState) => {
      return { showSignatureWindow: false }
    });
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
        <Modal visible={this.state.showSignatureWindow} animationType="slide"
          transparent={false}
          onRequestClose={() => { this.onSignatureClose }}>
          <View style={[styles.container, { marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }]}>
            <Text style={styles.formatText}>Assinatura do avaliador</Text>
            <View style={styles.signatureBox}>
              <Signature ref='signature' onSave={this.onSave.bind(this)} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Limpar' onPress={() => { this.refs.signature.resetSign(); }} />
              <View style={{ width: 20 }} />
              <Button title='Confirmar' onPress={ this.saveImage.bind(this) } />
            </View>
          </View>
        </Modal>

        <Image
          style={{ width: 150, height: 150 }}
          source={require('../../images/pm.png')}
        />
        <View style={styles.centerBox}>
          <TextInput
            placeholder="Nome"
            onChangeText={(text) => { this.setState({ name: text }); }}
          />          
        
        {/* <Signature ref='signature' onSave={this.onSave.bind(this)} /> */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="Entrar"
              borderRadius={15}
              backgroundColor='blue'
              onPress={() => {
                this.setState((prevState) => {
                  return { showSignatureWindow: true }
                });
              }}
            />
            {/* <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                borderRadius={15}
                  backgroundColor='blue'
                  onPress={() => this.resetImage()}
                  title="Limpar Assinatura"
                />
              </View> */}

            </View>
          </View>
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
  signatureBox: {
    marginTop:10,
    borderWidth: 1,
    borderRadius: 10,
    width: 550,
    height: 250,
  },
  centerBox: {
    borderWidth: 2,
    borderRadius: 10,
    width: 550,
    height: 120,
  },
  button: {
    width: 100
  },
  buttonContainer: {
    height: 40,
    margin: 5
  },
  buttonContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export { LoginScreen };
