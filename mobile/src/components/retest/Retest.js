
import React, { Component } from 'react';
import { CheckBox, StyleSheet, View, Text } from 'react-native';

class Retest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  changeCheckboxStatus = () => {
    const newChecked = !this.state.checked;
    this.setState((prevState) => {
      return {
        ...prevState,
        checked: newChecked,
      }
    }, () => {
      this.props.changeRestestValue(this.state.checked);
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
          value={ this.state.checked }
          onChange={ this.changeCheckboxStatus }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({ });

export { Retest };
