
import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, TextInput } from 'react-native';
import { Retest } from '../retest';
import { Signature, GlobalStyles } from '../common';
import { globalStyles } from '../common/GlobalStyles';
import { Button } from 'react-native-elements';
import { Storage } from '../../helper/storage/localMongodb';

class HeightExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Altura",
      number: '',
      classNumber: '',
      result: '',
      retest: false,
      showSignatureWindow: false,
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

  onChangeClassNumber = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        classNumber: val,
      }
    });
  }

  onChangeHeightValue = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        result: val,
      }
    });
  }

  clearFields = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        evaluatedPersonNumber: '',
        result: '',
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

  saveCandidateData = (image) => {
    const storage = new Storage();
    const { name, classNumber, number, result, retest } = this.state;
    const day = ((new Date).getDate() > 9) ? (new Date).getDate() : '0' + (new Date).getDate().toString();
    const month = ((new Date).getMonth() + 1 > 9) ? (new Date).getMonth() + 1 : '0' + ((new Date).getMonth() + 1).toString();
    const year = (new Date).getFullYear();
    console.log({ name, classNumber: parseInt(classNumber), number: parseInt(number), result: parseInt(result), retest, examDate: `${day}/${month}/${year}`, examTime: Date.now(), candidateSignature: image.encoded });

    storage.saveOnLocalStorage({ name, classNumber: parseInt(classNumber), number: parseInt(number), result: parseInt(result), retest, examDate: `${day}/${month}/${year}`, examTime: Date.now(), candidateSignature: image.encoded });
    this.setState((prevState) => {
      return {
        ...this.state,
        classNumber: "",
        number: "",
        result: ""
      }
    });
  }

  onSave(result) {
    if(result != null){
      this.setState((prevState) => {
        return { showSignatureWindow: false }
      }, () => this.saveCandidateData(result) );
    } else {
      this.setState((prevState) => {
        return { showSignatureWindow: false }
      });
      Alert.alert('Prova nao foi salva, candidato deve assinar');
    }
  }

  getSignature = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        showSignatureWindow: true,
      }
    });
  }

  saveImage() {
    this.refs.signature.saveSign();
  }

  render() {
    return (
      <View style={styles.heightExamContainer}>
      <Modal visible={this.state.showSignatureWindow} animationType="slide"
          transparent={false}
          onRequestClose={() => { this.onSignatureClose }}>
          <View style={[styles.container, { marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }]}>
            <Text style={globalStyles.formatTitle}>Assinatura do candidato</Text>
            <View style={styles.signatureBox}>
              <Signature ref='signature' onSave={this.onSave.bind(this)} />
            </View>
            <View style={styles.buttonContainer}>
              <Button buttonStyle={globalStyles.formatButtonMedium} title='Limpar' onPress={() => { this.refs.signature.resetSign(); }} />
              <View style={{ width: 20 }} />
              <Button buttonStyle={globalStyles.formatButtonMedium} title='Salvar' onPress={ this.saveImage.bind(this) } />
            </View>
          </View>
        </Modal>
        <View style={globalStyles.examNameContainer}>
          <Text style={globalStyles.formatTitle}>Teste de altura</Text>
        </View>
        <View style={[styles.containers, styles.evaluatedPersonContainer]}>
          <Text style={globalStyles.formatTextDark}>Turma do Avaliado:</Text>
          <TextInput 
            style={[globalStyles.inputNumber, globalStyles.formatTextDark]} 
            value={this.state.classNumber} 
            onChangeText={this.onChangeClassNumber}
            keyboardType='numeric'>
          </TextInput>
          <Text style={globalStyles.formatTextDark}>Número do Avaliado:</Text>
          <TextInput 
            style={[globalStyles.inputNumber, globalStyles.formatTextDark]} 
            value={this.state.number} 
            onChangeText={this.onChangenumber}
            keyboardType='numeric'>
          </TextInput>
        </View>      
        <View style={styles.examDataContainer}>
          <TextInput
            style={[globalStyles.inputNumber, globalStyles.formatTextDark]}
            value={this.state.result}
            onChangeText={this.onChangeHeightValue}
            keyboardType='numeric'></TextInput>
          <Text style={globalStyles.formatTextDark} >centímetros</Text>
        </View>
        <View style={[globalStyles.retestContainer]}>
          <Retest changeRestestValue={this.setRetestValue} />
          <Text>Retest</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button fontSize={22} buttonStyle={[globalStyles.formatButtonMedium, globalStyles.backgroundGreen]} title='Salvar' onPress= {this.getSignature }></Button>
          <View style={styles.marginBetweenButtons} />
          <Button fontSize={22} buttonStyle={[globalStyles.formatButtonMedium]} title='Limpar' onPress={this.clearFields}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signatureBox: {
    marginTop:10,
    borderWidth: 1,
    borderRadius: 10,
    width: 550,
    height: 205,
  },
  heightExamContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  evaluatedPersonContainer: {
    flex: 1,
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  examDataContainer: {
    marginTop: -10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatHeightValue: {
    width: '15%',
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
  marginBetweenButtons: {
    flex: 0.2,
  },
});

export { HeightExam };
