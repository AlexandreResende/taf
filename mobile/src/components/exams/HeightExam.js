
import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, TextInput } from 'react-native';
import { Retest } from '../retest';
import { Signature, GlobalStyles } from '../common';
import { globalStyles } from '../common/GlobalStyles';
import { Button } from 'react-native-elements';

class HeightExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluatedPersonNumber: '',
      heigthValue: '',
      retest: false,
      showSignatureWindow: false,
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

  saveCandidateData = () => {
    this.setState((prevState) => {
      return {
        ...this.state,
        showSignatureWindow: true,
      }
    });
  }

  onSave(result){
    if(result != null)
    {

    }
  }

  onSignatureClose(){
    this.setState((prevState) =>
    {
      return{
        ...this.state,
        showSignatureWindow:false,
      }
    }
    );
    alert('Modal has been closed.');

  }

  render() {
    return (
      <View style={styles.heightExamContainer}>
      <Modal visible={this.state.showSignatureWindow} animationType="slide"
          transparent={false}
          onRequestClose={() => { this.onSignatureClose }}>
          <View style={[styles.container, { marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }]}>
            <Text style={styles.formatText}>Assinatura do candidato</Text>
            <View style={styles.signatureBox}>
              <Signature ref='signature' onSave={this.onSave.bind(this)} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Limpar' onPress={() => { this.refs.signature.resetSign(); }} />
              <View style={{ width: 20 }} />
              <Button title='Salvar' onPress={() => { this.setState((prevState) => { return { showSignatureWindow: false } }); }} />
            </View>
          </View>
        </Modal>
        <View style={globalStyles.examNameContainer}>
          <Text style={globalStyles.formatTitle}>Teste da altura</Text>
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
          <Button buttonStyle={[globalStyles.formatButtonMedium, globalStyles.backgroundGreen]} title='Salvar' onPress= {this.saveCandidateData }></Button>
          <View style={styles.marginBetweenButtons} />
          <Button buttonStyle={globalStyles.formatButtonMedium} title='Limpar' onPress={this.clearFields}></Button>
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
  evaluatedPersonNumber: {
    width: '15%',
    justifyContent: 'center',
    textAlign: 'center',
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
    fontSize: 25,
  }
});

export { HeightExam };
