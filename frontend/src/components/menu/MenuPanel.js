import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import styles from './styles';

class MenuPanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: this.props.navigation
    }
  }

  componentDidMount (){
    console.log('A')
    console.log(this.state);
  }

  render() {
    return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>
          Menu
        </Text>
        <Button
          title="Close"
          onPress={() => {
            this.props.closeDrawer()
          }}
        />
        <Button
          title="Prova dos 12 minutos"
          onPress={() => {
            this.state.navigation.push('TwelveMinutesRun', {
              name: this.state.navigation.getParam('name', 'Invalid Name'),
            })
          }}
        />
      </View>
    )
  }
}

export default MenuPanel;
