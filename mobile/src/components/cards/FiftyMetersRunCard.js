import React, { Component } from 'react';
import { Modal,View, Text, StyleSheet, TextInput } from 'react-native';
import CardView from 'react-native-cardview';
import {Button} from 'react-native-elements';
import { globalStyles} from '../common/GlobalStyles';
import { Signature } from '../common/Signature';
import { Retest } from '../retest/Retest';

class FiftyMetersRunCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluatedPersonNumber: '',
      counter: 0,
      seconds: '0',
      miliseconds: '0',
    };
  }

  componentWillMount() {
    this.setState({
      showSignatureWindow: false,
      candidateSignature: "",
      signed: "Não",
      retest: false,
      result: "0"
    }, () => this.saveData() );
  }

  onChangeSecondsValue = (val) => {
    (val.length == 0) ? val = "00": val;
    this.setState((prevState) =>
    {
      return{
        ...this.state,
        seconds: val,
      }
    }, () => this.saveData() );
  }  

  onChangeMilisecondsValue = (val) => {
    (val.length == 0) ? val = "00": val;
    this.setState((prevState) =>
    {
      return{
        ...this.state,
        miliseconds: val,
      }
    }, () => this.saveData() );
  } 

  setRetestValue = (val) => 
  {
    this.setState((prevState) => {
      return {
        ...this.state,
        retest: val,
      };
    }, () => this.saveData());
  }

  saveData() {
    let milli = (this.state.miliseconds.length == 1) ? "0" + this.state.miliseconds : this.state.miliseconds;
    milli = (milli == "") ? "00" : milli; 
    this.props.saveData(this.props.candidateNumber,(this.state.seconds + milli),this.state.retest,this.state.candidateSignature);
  }

  onSave(result){
    if(result != null) {
      this.setState({
        candidateSignature: result.encoded,
        signed: "Sim"
      }, () => this.saveData());
    } else {
      this.setState({
        candidateSignature: "",
        signed: "Não"
      }, () => this.saveData());
    }
  }

  render() {
    return (
      <CardView
        cardElevation={5}
        cardMaxElevation={0}
        cornerRadius={6}
        style={styles.card}>
        <Modal visible={this.state.showSignatureWindow} animationType="slide"
          transparent={false}
          onRequestClose={() => { this.onSignatureClose }}>
          <View style={[styles.container, { marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }]}>
            <Text style={globalStyles.formatTitle}>Assinatura do candidato</Text>
            <View style={styles.signatureBox}>
              <Signature ref='signature' saveOnDrag={true} onSave={this.onSave.bind(this)} />
            </View>
            <View style={[styles.buttonContainer,{justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}]}>
              <Button buttonStyle={globalStyles.formatButtonMedium} title='Limpar' onPress={() => { 
                  this.refs.signature.resetSign(); 
                  this.setState({
                    candidateSignature: "",
                    signed: "Não"
                  }, () => this.saveData());
                }}/>
              <View style={{ width: 20 }} />
              <Button buttonStyle={globalStyles.formatButtonMedium} title='Salvar' onPress={() => { this.setState((prevState) => { return { showSignatureWindow: false } }); }} />
            </View>
          </View>
        </Modal>
        <View>
          <View>
            <Text style={styles.text}>
              Numero do candidato: <Text style={styles.number}>{this.props.candidateNumber}</Text>
            </Text>
            <Text style={styles.text}>
                Assinado: <Text >{this.state.signed}</Text>
            </Text>
            <View style={{marginTop: 20}}/>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>
                Tempo:
                </Text>
              <View style={{ flexDirection: 'column' }}>
                {/* <Button title=' + ' onPress={() => { this.incrementCounter(2) }} /> */}
                <TextInput
                  value={this.state.seconds}
                  style={[globalStyles.inputNumber,{fontSize: 25}]}
                  keyboardType='numeric'
                  onChangeText={this.onChangeSecondsValue} 
                  onTouchStart={ () => 
                    { 
                      if(this.state.seconds == '0')
                        this.setState({
                          seconds: '',
                        })
                    }} />
                {/* <Button title=' - ' onPress={() => { this.decrementCounter(2) }} /> */}
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={globalStyles.formatTextDark}> : </Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                {/* <Button title=' + ' onPress={() => { this.incrementCounter(3) }} /> */}
                <TextInput
                  value={this.state.miliseconds}
                  style={[globalStyles.inputNumber,{fontSize: 25}]}
                  keyboardType='numeric'
                  onChangeText={this.onChangeMilisecondsValue}
                  onTouchStart={ () => 
                  { 
                    if(this.state.miliseconds == '0')
                      this.setState({
                        miliseconds: '',
                      })
                  }} />
                {/* <Button title=' - ' onPress={() => { this.decrementCounter(3) }} /> */}
              </View>
            </View>
            <View style={styles.container}>
              <Retest changeRestestValue={this.setRetestValue} />
              <Text>Reteste</Text>
            </View>
            <View style={[styles.buttonContainer,{marginTop: 40}]}>
              <Button 
                title="Assinar" 
                backgroundColor='#1AA9E2'
                fontSize={20}
                borderRadius={10}
                onPress={() => { this.setState({ showSignatureWindow: true  }) }}
              />
            </View>
          </View>
        </View>
      </CardView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    width: 300
  },
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
  buttonContainer: {
    height: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  centerData: {
    alignItems: 'center',
    justifyContent: 'center'    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  spacing: {
    margin: 10,
    width: '100%'
  },
  number: {
    fontSize: 30,
    color: 'black'
  },
  metersContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export { FiftyMetersRunCard };
