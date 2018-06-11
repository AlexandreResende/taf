import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SignatureCard } from './TwelveMinutesRun/index';

class TwelveMinutesRunEnd extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.setState({
      results: []
    })
  }

  save(){
    //TODO DATABASE
    console.log(this.state.results)
  }

  saveData = (number,laps,meters,signature) => {
    let exam = {
      number: number,
      laps: laps,
      meters: meters,
      signature: signature
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
    let arr = this.props.arr.map((element, i) => {
      return <SignatureCard key={i} number={element.number} laps={element.laps} meters={element.meters} saveData={this.saveData} />
    })
    return (
      <ScrollView>
        <View style={styles.container}>
          {arr}
        </View>
        <Button title="Salvar" onPress={ () => this.save() } />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

export { TwelveMinutesRunEnd };
