import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Signature } from '../common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from './TwelveMinutesRun/index';

class TwelveMinutesRun extends Component {

  componentWillMount() {
    this.setState({
      arr: []
  })
  }

  addToArr(temp) {
    this.state.arr.push(temp)
    this.setState({
        arr: this.state.arr
    })
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
              onPress={  () => this.addToArr(122) }
            >
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
