import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import { Signature } from '../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from './TwelveMinutesRun/index';

class TwelveMinutesRun extends Component {

  componentWillMount() {
    this.setState({
      arr: [],
      number: ''
  })
  }

  addToArr() {
    if(!this.state.number || this.state.number.length == 0)
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

  render() {
    let Arr = this.state.arr.map((element) => {
      return <Card candidateNumber={element}/>                            
    })
    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection:'row' ,flexWrap: 'wrap'}}>
          { Arr }
          <View style={styles.card}>
            <TouchableOpacity  
              style={{height: '100%',width:'100%', justifyContent: 'center', alignItems: 'center'}}
              onPress={  () => this.addToArr() }
            >
              <TextInput
                style={{ color: 'white', width: 90}}
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
  }
});

export { TwelveMinutesRun };
