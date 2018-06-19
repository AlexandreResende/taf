import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from './TwelveMinutesRun/index';
import { globalStyles } from '../common/GlobalStyles';
import { Storage } from '../../helper/storage/localMongodb';

class TwelveMinutesRun extends Component {

  componentWillMount() {
    this.setState({
      arr: [],
      number: '',
      results: [],
      classNumber: '',
      examDate: this.getDate()
    })
  }

  getDate =() =>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;
  }

  addToArr() {
    if(!this.state.number || this.state.number.length == 0 || this.state.classNumber == 0 || this.state.arr.indexOf(this.state.number) != -1)
      return;
    this.state.arr.push(this.state.number)
    this.setState({
        arr: this.state.arr,
        number: ''
    })
  }

  _onChangeText(text) {
    this.setState({ number : text});
  }

  endExam(){
    Alert.alert(
      'Confirmação',
      'Você deseja finalizar a prova?',
      [
        {text: 'Não', onPress: () => {}},
        {text: 'Sim!', onPress: () => this.saveToDb()},
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

  saveData(number,laps,meters,candidateSignature){
    let exam = {
      name: "Corrida de 12 minutos",
      number: parseInt(number),
      result: (parseInt(laps) * 400) + parseInt(meters),
      candidateSignature: candidateSignature,
      retest: false,
      classNumber: parseInt(this.state.classNumber),
      examDate: this.state.examDate,
      examTime: Date.now()
    }
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

  render() {
    let Arr = this.state.arr.map((element, i) => {
      return <Card candidateNumber={element} 
                 key={i} saveData={this.saveData.bind(this)}
              />                            
    })
    return (
      <ScrollView style={styles.container}>
        <View style={globalStyles.examNameContainer}>
          <Text style={globalStyles.formatTitle}>Corrida dos 12 minutos</Text>
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
            <Text style={globalStyles.formatTextLight}>Número do Avaliado:</Text>
              <TextInput
                style={[globalStyles.inputCard, globalStyles.formatTextDark]}
                onChangeText={(text) => this.setState({ number : text}) }
                maxLength={3}
                keyboardType='numeric'
                value={this.state.number}
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
    flex: 1
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
  formatText: {
    color: 'white',
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
    color: 'white',
    width: 90
  },
  finishButtonContainer:{
    alignItems: 'center',
    margin: 5
  },
  finishButton: {
    width: 200
  }
});

export { TwelveMinutesRun };
