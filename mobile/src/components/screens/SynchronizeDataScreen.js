import React, { Component } from 'react';
import { Logo } from '../common';
import { View, Text, Easing, StyleSheet, Button } from 'react-native';
import { Storage } from '../../helper/storage/localMongodb';

class SynchronizeDataScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  synchronizeData =  async () => {
    const storage = new Storage();
    //await storage.removeFromLocalStorage();
    const dataToBeSynchronized = await storage.loadFromLocalStorage();

    for (let exam of dataToBeSynchronized) {
      console.log(exam);
      let { name, classNumber, number, result, retest, examDate, examTime } = exam;
      await fetch('http://192.168.1.25:3000/exams', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          examDate,
          examTime,
          classNumber,
          number,
          result,
          retest,
        }),
      }).then(console.log);
    }
  }

  render (){
    return (
      <View>
        <Button
          title={'Sincronizar'}
          onPress={this.synchronizeData}
        />
      </View>
    );
  }
}

export { SynchronizeDataScreen };
