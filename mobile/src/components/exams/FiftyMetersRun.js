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
      examDate: this.getDate()
    };
  }

  getDate =() =>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;
  }

  addToArr() {
    console.log("adding")
    if(!this.state.evaluatedPersonNumber || this.state.evaluatedPersonNumber.length == 0 || !this.state.classNumber || this.state.classNumber == 0 || this.state.arr.indexOf(this.state.evaluatedPersonNumber) != -1)
      return;
    this.state.arr.push(this.state.evaluatedPersonNumber)
    this.setState({
        arr: this.state.arr,
        evaluatedPersonNumber: ''
    })
  }

  endExam(){
    Alert.alert(
      'Confirmação',
      'Você deseja finalizar a prova?',
      [
        {text: 'Não', onPress: () => {}},
        {text: 'Sim!', onPress: () => {this.saveToDb()}},
      ],
      { cancelable: false }
    )
  }

  saveToDb(){  
    let arr = this.state.results
    let allSigned = true
    for(let i = 0 ; i < arr.length ; i++){
      if(arr[i].candidateSignature.length == 0)
        allSigned = false
    }

    if(allSigned){
      const storage = new Storage();
      storage.saveOnLocalStorage(this.state.results);
      Alert.alert("Prova finalizada");
      this.props.navigation.navigate('Home', {
        name: this.props.navigation.getParam('name', ''),
        appraiserSignature: this.props.navigation.getParam('appraiserSignature', '')
      })
    } else {
      Alert.alert("Todos candidatos devem assinar a prova");
    }
  }

  saveData(number,result,retest,candidateSignature){
    let exam = {
      name: "Corrida de 50 metros",
      number: parseInt(number),
      result: parseInt(result),
      candidateSignature: candidateSignature,
      retest: retest,
      classNumber: parseInt(this.state.classNumber),
      examDate: this.state.examDate,
      examTime: Date.now()
    }
    console.log(exam);
    let replaced = false;
    for(var index = 0 ; index < this.state.results.length ; index++){
      if(this.state.results[index].number == number){
        this.state.results[index] = exam;
        replaced = true;
      }
    }
    if( !replaced ) 
      this.state.results.push(exam);
  }

  render()
  {
    let Arr = this.state.arr.map((element, i) => {
      return <FiftyMetersRunCard 
                candidateNumber={element}
                key={i} saveData={this.saveData.bind(this)}
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