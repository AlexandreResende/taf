import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from './TwelveMinutesRun/index';
import { globalStyles } from '../common/GlobalStyles';

class TwelveMinutesRun extends Component {

  componentWillMount() {
    this.setState({
      arr: [],
      number: '',
      results: [],
      examDate: new Date().getTime()
    })
  }

  addToArr() {
    if(!this.state.number || this.state.number.length == 0 || this.state.arr.indexOf(this.state.number) != -1)
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
    console.log(this.state)
  }

  saveData(number,laps,meters,candidateSignature,appraiserSignature,appraiserName){
    let exam = {
      name: "Corrida de 12 minutos",
      number: number,
      result: (parseInt(laps) * 400) + parseInt(meters),
      candidateSignature: candidateSignature,
      appraiserSignature: appraiserSignature,
      appraiserName: appraiserName,
      retest: false,
      examDate: this.state.examDate
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
                   appraiserSignature={this.props.navigation.getParam('appraiserSignature', '')} 
                   appraiserName={this.props.navigation.getParam('name', '')}  key={i} saveData={this.saveData.bind(this)}
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
            <Text style={styles.formatText}>Número do Avaliado:</Text>
              <TextInput
                style={styles.inputCandidateNumber}
                onChangeText={(text) => this.setState({ number : text}) }
                maxLength={3}
                keyboardType='numeric'
                value={this.state.number}
              />
            <Text style={styles.formatText}>Turma do Avaliado:</Text>
              <TextInput
                style={styles.inputCandidateNumber}
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
    height: 220,
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
