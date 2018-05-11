import React, { Component } from 'react';
import { View, Button, StyleSheet, TextInput, Alert, Image } from 'react-native';

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
        <Image
          style={{ width: 150, height: 150 }}
          source={{ uri: 'data:image/png;base64,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' }}
        />
        <View style={styles.centerBox}>
          <TextInput
            placeholder="Nome"
            onChangeText={(text) => { this.setState({ name: text }); }}
          />
          <Button
            title="Entrar"
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
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    height: 100,
  },
});

export default LoginScreen;
