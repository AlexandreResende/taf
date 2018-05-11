import React, { Component } from 'react';
import { View, Button } from 'react-native';

class LoginScreen extends Component {
  render() {
    return (
      <View>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

export default LoginScreen;
