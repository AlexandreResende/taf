
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class HeightExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluatedPersonNumber: '',
      heigthValue: '',
    };
  }

  onChangeEvaluatedPersonNumber = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        evaluatedPersonNumber: val,
      }
    });
  }

  onChangeHeightValue = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        heigthValue: val,
      }
    });
  }

  clearFields = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        evaluatedPersonNumber: '',
        heigthValue: '',
      }
    });
  }

  render() {
    return (
      <View style={styles.heightExamContainer}>
        <View style={styles.evaluatedPersonContainer}>
          <Text style={styles.evaluatedPersonText}>Número do Avaliado:</Text>
          <TextInput 
            style={styles.evaluatedPersonNumber} 
            value={this.state.evaluatedPersonNumber} 
            onChangeText={this.onChangeEvaluatedPersonNumber}
            keyboardType='numeric'>
          </TextInput>
        </View>
        <View style={styles.examDataContainer}>
          <TextInput
            style={styles.formatHeightValue}
            value={this.state.heigthValue}
            onChangeText={this.onChangeHeightValue}
            keyboardType='numeric'></TextInput>
          <Text style={styles.formatHeightText} >centímetros</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button color={'green'} title='Salvar' onPress={() => {return null;}}></Button>
          <View style={styles.marginBetweenButtons} />
          <Button title='Limpar' onPress={this.clearFields}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heightExamContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  evaluatedPersonContainer: {
    flex: 1,
    marginTop: -30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evaluatedPersonText: {
    color: 'black',
    fontSize: 18,
  },
  evaluatedPersonNumber: {
    width: '5%',
    color: 'black',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
  },
  examDataContainer: {
    marginTop: -100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatHeightValue: {
    width: '7%',
    borderColor: 'black',
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  formatHeightText: {
    color: 'black',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: -40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  marginBetweenButtons: {
    flex: 0.2,
  }
});

export { HeightExam };
