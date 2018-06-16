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
    const dataToBeSynchronized = await storage.loadFromLocalStorage();

    for (let exam of dataToBeSynchronized) {
      try {
        let { name, classNumber, number, result, retest } = exam;
        classNumber = (classNumber) ? classNumber : 1;
        await fetch('http://192.168.1.25:3000/exams', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            classNumber,
            number,
            result,
            retest,
          }),
        }).then(console.log);
      } catch (error) {
        console.log(error);
      }
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
