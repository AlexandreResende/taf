import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import styles from './styles';

class MenuPanel extends Component {
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
      </View>
    )
  }
}

export default MenuPanel;
