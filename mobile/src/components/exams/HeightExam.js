
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Retest } from '../retest';

class HeightExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluatedPersonNumber: '',
      heigthValue: '',
      retest: false,
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

  setRetestValue = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        retest: val,
      };
    });
  }

  render() {
    return (
      <View style={styles.heightExamContainer}>
        <View style={styles.examNameContainer}>
          <Text style={styles.formatText}>Teste da altura</Text>
        </View>
        <View style={styles.evaluatedPersonContainer}>
          <Text style={styles.formatText}>Número do Avaliado:</Text>
          <TextInput 
            style={[styles.evaluatedPersonNumber, styles.formatText]} 
            value={this.state.evaluatedPersonNumber} 
            onChangeText={this.onChangeEvaluatedPersonNumber}
            keyboardType='numeric'>
          </TextInput>
        </View>
        <View style={styles.examDataContainer}>
          <TextInput
            style={[styles.formatHeightValue, styles.formatText]}
            value={this.state.heigthValue}
            onChangeText={this.onChangeHeightValue}
            keyboardType='numeric'></TextInput>
          <Text style={styles.formatText} >centímetros</Text>
        </View>
        <View style={[styles.retestContainer]}>
          <Retest changeRestestValue={this.setRetestValue} />
          <Text>Retest</Text>
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
  examNameContainer: {
    flex: 1,
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evaluatedPersonContainer: {
    flex: 1,
    marginTop: -50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evaluatedPersonNumber: {
    width: '5%',
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
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: -40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  retestContainer: {
    flex: 1,
    //marginBottom: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginBetweenButtons: {
    flex: 0.2,
  },
  formatText: {
    color: 'black',
    fontSize: 18,
  }
});

export { HeightExam };
