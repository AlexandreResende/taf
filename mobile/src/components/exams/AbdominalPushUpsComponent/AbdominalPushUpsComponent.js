
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Retest } from '../../retest';

class AbdominalPushUpsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examName: this.props.examName,
      evaluatedPersonNumber: '',
      counter: 0,
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

  clearFields = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        evaluatedPersonNumber: '',
        counter: 0,
      }
    });
  }

  incrementCounter = () => {
    console.log(this.state.counter);
    this.setState((prevState) => {
      return {
        ...this.state,
        counter: this.state.counter + 1,
      }
    });
  };

  decrementCounter = () => {
    console.log(this.state.counter);
    this.setState((prevState) => {
      return {
        ...this.state,
        counter: (this.state.counter - 1 < 0) ? 0 : this.state.counter - 1,
      }
    });
  };

  render() {
    return (
      <View style={[styles.AbdominalPushUpsExamContainer]}>
        <View style={[styles.containers, styles.examNameContainer]}>
          <Text style={styles.formatText}>{this.state.examName}</Text>
        </View>
        <View style={[styles.containers, styles.evaluatedPersonContainer]}>
          <Text style={styles.formatText}>Número do Avaliado:</Text>
          <TextInput 
            style={[styles.evaluatedPersonNumber, styles.formatText]} 
            value={this.state.evaluatedPersonNumber} 
            onChangeText={this.onChangeEvaluatedPersonNumber}
            keyboardType='numeric'>
          </TextInput>
        </View>
        <View style={[styles.containers, styles.examDataContainer]}>
        <Button color={'red'} title='-' onPress={this.decrementCounter}></Button>
          <View style={styles.marginBetweenButtons} />
          <Text
            style={[styles.formatHeightValue, styles.formatText]}
            >{this.state.counter}</Text>
          <View style={styles.marginBetweenButtons} />
          <Button color={'green'} title='+' onPress={this.incrementCounter}></Button>
        </View>
        <View style={[styles.containers, styles.retestContainer]}>
          <Retest></Retest>
          <Text>Reteste</Text>
        </View>
        <View style={[styles.containers, styles.buttonContainer]}>
          <Button color={'green'} title='Salvar' onPress={() => {return null;}}></Button>
          <View style={styles.marginBetweenButtons} />
          <Button title='Limpar' onPress={this.clearFields}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containers: {
    marginTop: 40,
    marginBottom: 20,
  },
  AbdominalPushUpsExamContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  examNameContainer: {
    flex: 1,
    //marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evaluatedPersonContainer: {
    flex: 1,
    //marginTop: -70,
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
    //marginBottom: 200,
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
  retestContainer: {
    flex: 1,
    //marginBottom: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    //marginTop: -200,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  marginBetweenButtons: {
    flex: 0.1,
  },
  formatText: {
    color: 'black',
    fontSize: 18,
  }
});

export { AbdominalPushUpsComponent };
