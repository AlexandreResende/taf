import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from './TwelveMinutesRun/index';

class TwelveMinutesRun extends Component {

  componentWillMount() {
    this.setState({
      arr: [],
      number: '',
      results: []
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
      number: number,
      laps: laps,
      meters: meters,
      candidateSignature: candidateSignature,
      appraiserSignature: appraiserSignature,
      appraiserName: appraiserName
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
        <Button
          title="Finalizar"
          onPress={ this.endExam.bind(this) }
        />
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
    backgroundColor: 'green',
    margin: 10,
    width: 300,
    height: 200,
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
  }
});

export { TwelveMinutesRun };
