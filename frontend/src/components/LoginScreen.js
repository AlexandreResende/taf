import React, { Component } from 'react';
import { View, Button, StyleSheet, TextInput, Alert } from 'react-native';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  loginValidator() {
    if(this.state.name.length > 0){
      this.props.navigation.navigate('Home', {
        name: this.state.name,
      })
    } else {
      Alert.alert("Nome nao pode ser vazio")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerBox}>
          <TextInput
            placeholder="Nome"
            onChangeText={(text) => { this.setState({ name: text }); }}
          />
          <Button
            title="Login"
            onPress={ this.loginValidator.bind(this) }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBox: {
    borderWidth: 10,
    borderRadius: 10,
    width: 300,
    height: 100,
  },
});

export default LoginScreen;
