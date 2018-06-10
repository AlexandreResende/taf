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
      minutes: '00',
      seconds: '00',
      miliseconds: '00',
    };
  }

  zeroFill( number, width )
  {
    width -= number.toString().length;
    if ( width > 0 )
    {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
  }

  incrementCounter(type)
  {
    var timerCounter = Object.freeze({"minutes":1, "seconds":2, "miliseconds":3});
    switch(type)
    {
      case timerCounter.minutes:
      this.setState((prevState) => {
        return {
          ...this.state,
          minutes: this.zeroFill((Number(this.state.minutes) + 1),2),
        }
      });
      break;
      case timerCounter.seconds:
      this.setState((prevState) => {
        return {
          ...this.state,
          seconds: this.zeroFill((Number(this.state.seconds) + 1),2),
        }
      });
      break;
      case timerCounter.miliseconds:
      this.setState((prevState) => {
        return {
          ...this.state,
          miliseconds: this.zeroFill((Number(this.state.miliseconds) + 1),2),
        }
      });
      break;
      default:
      console.log('erro');
      break;
    }
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
            <View style={[styles.container, {flexDirection:'row'}]}>
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
            <Text> (MINUTOS : SEGUNDOS : MILISSEGUNDOS)</Text>
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'column'}}>
                <Button title=' + ' onPress={ () => {this.incrementCounter(1)} }/>
                <TextInput value={this.state.minutes} style={{width:50}} keyboardType='numeric' />
                <Button title=' - ' />
              </View>
              <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.formatText}> : </Text>
              </View>
              <View style={{flexDirection:'column'}}>
                <Button title=' + ' onPress={ () => {this.incrementCounter(2)} }/>
                <TextInput value={this.state.seconds} style={{width:50}} keyboardType='numeric'/>
                <Button title=' - ' />
              </View>
              <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.formatText}> : </Text>
              </View>
              <View style={{flexDirection:'column'}}>
                <Button title=' + ' onPress={ () => {this.incrementCounter(3)} }/>
                <TextInput value={this.state.miliseconds} style={{width:50}} keyboardType='numeric'/>
                <Button title=' - ' />
              </View>
            </View>
            

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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',

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
    width: 65
  }
});

export { FiftyMetersRun};