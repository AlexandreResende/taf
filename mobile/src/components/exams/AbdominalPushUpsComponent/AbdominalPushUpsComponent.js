
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Retest } from '../../retest';
import Storage from '../../../helper/storage/localMongodb';

class AbdominalPushUpsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.examName,
      number: '',
      result: 0,
    };
  }

  onChangenumber = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        number: val,
      }
    });
  }

  clearFields = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        number: '',
        result: 0,
      }
    });
  }

  incrementResult = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        result: this.state.result + 1,
      }
    });
  };

  decrementResult = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        result: (this.state.result - 1 < 0) ? 0 : this.state.result - 1,
      }
    });
  };

  saveCandidateExamData = () => {
    const storage = new Storage();
    const { name, number, result } = this.state;

    storage.saveOnLocalStorage({ name, number, result });
    this.setState((prevState) => {
      return {
        ...this.state,
        number: '',
        result: 0,
      }
    });
  }

  render() {
    return (
      <View style={[styles.AbdominalPushUpsExamContainer]}>
        <View style={[styles.containers, styles.nameContainer]}>
          <Text style={styles.formatText}>{this.state.name}</Text>
        </View>
        <View style={[styles.containers, styles.evaluatedPersonContainer]}>
          <Text style={styles.formatText}>Número do Avaliado:</Text>
          <TextInput 
            style={[styles.number, styles.formatText]} 
            value={this.state.number} 
            onChangeText={this.onChangenumber}
            keyboardType='numeric'>
          </TextInput>
        </View>
        <View style={[styles.containers, styles.examDataContainer]}>
        <Button color={'red'} title='-' onPress={this.decrementresult}></Button>
          <View style={styles.marginBetweenButtons} />
          <Text
            style={[styles.formatHeightValue, styles.formatText]}
            >{this.state.result}</Text>
          <View style={styles.marginBetweenButtons} />
          <Button color={'green'} title='+' onPress={this.incrementresult}></Button>
        </View>
        <View style={[styles.containers, styles.retestContainer]}>
          <Retest></Retest>
          <Text>Reteste</Text>
        </View>
        <View style={[styles.containers, styles.buttonContainer]}>
          <Button color={'green'} title='Salvar' onPress={this.saveCandidateExamData}></Button>
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
  nameContainer: {
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
  number: {
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
