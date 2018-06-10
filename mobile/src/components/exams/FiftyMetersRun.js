import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import { Signature } from '../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Retest} from '../retest';

class FiftyMetersRun extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      evaluatedPersonNumber: '',
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  onChangeEvaluatedPersonNumber = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        evaluatedPersonNumber: val,
      }
    });
  }

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render()
  {
    return (
      <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
              <Text>
                  Numero do candidato:
              </Text>
              <TextInput 
                style={[styles.inputCandidateNumber, styles.formatText]} 
                value={this.state.evaluatedPersonNumber} 
                onChangeText={this.onChangeEvaluatedPersonNumber}
                keyboardType='numeric'>
              </TextInput>            
            </View>
            <View>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode='time'
                />
              </View>
              <TouchableOpacity
                onPress={() => {this._showDateTimePicker()}}>
                <TextInput editable={false}/>
              </TouchableOpacity>
              <View style={[styles.retestContainer]}>
                <Retest></Retest>
                <Text>Reteste</Text>
              </View>
          </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',

  },
  retestContainer: {
    flex: 1,
    //marginBottom: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatText: {
    color: 'black',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  addButton: {
    height: '100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputCandidateNumber: {
    color: 'black',
    width: 90
  }
});

export { FiftyMetersRun};