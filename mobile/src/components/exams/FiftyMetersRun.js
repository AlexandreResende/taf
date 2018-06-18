import React, { Component } from 'react';
import { Alert, Modal, View, Button, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Retest} from '../retest';
import { globalStyles } from '../common/GlobalStyles';
import { FiftyMetersRunCard } from '../cards/FiftyMetersRunCard';
import { Storage } from '../../helper/storage/localMongodb';

class FiftyMetersRun extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      evaluatedPersonNumber: '',
      showSignatureWindow: false,
      arr: [],
      results: [],
      classNumber: '',
      examDate: new Date().getTime()
    };
  }

  // zeroFill( number, width )
  // {
  //   width -= number.toString().length;
  //   if ( width > 0 )
  //   {
  //     return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  //   }
  //   return number + ""; // always return a string
  // }

  addToArr() {
    if(!this.state.evaluatedPersonNumber || this.state.evaluatedPersonNumber.length == 0 || !this.state.classNumber || this.state.classNumber == 0 || this.state.arr.indexOf(this.state.evaluatedPersonNumber) != -1)
      return;
    this.state.arr.push(this.state.evaluatedPersonNumber)
    this.setState({
        arr: this.state.arr,
        evaluatedPersonNumber: ''
    })
  }

  onChangeEvaluatedPersonNumber = (val) => {
    this.setState((prevState) => {
      return {
        ...this.state,
        evaluatedPersonNumber: val,
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

  }

  endExam(){
    Alert.alert(
      'Confirmação',
      'Você deseja finalizar a prova?',
      [
        {text: 'Não', onPress: () => {}},
        {text: 'Sim!', onPress: () => {}/*this.saveToDb()*/},
      ],
      { cancelable: false }
    )
  }

  saveData(number,candidateSignature){
    let exam = {
      name: "Corrida de 12 minutos",
      number: parseInt(number),
      //result: (parseInt(laps) * 400) + parseInt(meters),
      candidateSignature: candidateSignature,
      retest: false,
      classNumber: parseInt(this.state.classNumber),
      examDate: this.state.examDate,
      examTime: Date.now()
    }
  }

  render()
  {
    let Arr = this.state.arr.map((element, i) => {
      return <FiftyMetersRunCard 
                candidateNumber={element}
                // appraiserSignature={this.props.navigation.getParam('appraiserSignature', '')} 
                // appraiserName={this.props.navigation.getParam('name', '')} 
                key={i} saveData={() => {}}
              />                            
    })
    return (
      <ScrollView style={{flex: 1}}>
        <View style={globalStyles.examNameContainer}>
          <Text style={globalStyles.formatTitle}>Corrida dos 50 metros</Text>
        </View>
        <View style={styles.finishButtonContainer}>
          <View style={styles.finishButton}>
            <Button
              title="Finalizar Prova"
              onPress={ this.endExam.bind(this) }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          { Arr }
          <View style={styles.card}>
            <TouchableOpacity  
              style={styles.addButton}
              onPress={  () => this.addToArr() }
            >
            <Text style={[globalStyles.formatTextLight, { marginTop: 10 }]}>Número do Avaliado:</Text>
              <TextInput
                style={[globalStyles.inputCard, globalStyles.formatTextDark]}
                onChangeText={(text) => this.setState({ evaluatedPersonNumber : text}) }
                maxLength={3}
                keyboardType='numeric'
                value={this.state.evaluatedPersonNumber}
              />
            <Text style={globalStyles.formatTextLight}>Turma do Avaliado:</Text>
              <TextInput
                style={[globalStyles.inputCard, globalStyles.formatTextDark]}
                onChangeText={(text) => this.setState({ classNumber : text}) }
                keyboardType='numeric'
                value={this.state.classNumber}
              />
              <Icon name="plus-circle" size={70} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
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
  card: {
    backgroundColor: '#02bc76',
    margin: 10,
    width: 300,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
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
    flexWrap: 'wrap',
    marginTop: 0,
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
  },
  finishButtonContainer:{
    alignItems: 'center',
    margin: 5
  },
  finishButton: {
    width: 200
  }
});

export { FiftyMetersRun};