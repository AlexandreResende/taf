
import React, { Component } from 'react';
import { CheckBox, StyleSheet, View } from 'react-native';

class Retest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  changeCheckboxStatus = () => {
    this.setStatus({
      checked: !this.state.checked,
    });
  }

  render() {
    return (
      <View>
        <CheckBox
          title='Resteste'
          center
          checkedIcon='dot-circle-o'
          uncheckedIcon='dot-circle'
          onPress={ this.changeCheckboxStatus }  
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export { Retest };
