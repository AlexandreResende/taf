import React, { Component } from 'react';
import { Logo } from '../common';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Storage } from '../../helper/storage/localMongodb';
import { globalStyles } from '../common/GlobalStyles';
import { Button } from 'react-native-elements';


class SynchronizeDataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: '',
    };
  }

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
      // console.log(this.props.navigation.getParam('appraiserSignature',''))
      let appraiserSignature = this.props.navigation.getParam('appraiserSignature','');
      let appraiserName = this.props.navigation.getParam('name', 'Invalid Name')
      let { name, classNumber, number, result, retest, examDate, examTime, candidateSignature } = exam;
      await fetch(`http://${this.state.ipAddress}:3000/exams`, {
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
          candidateSignature,
          appraiserSignature,
          appraiserName,
        }),
      }).then(console.log);
    }
    storage.removeFromLocalStorage()
  }

  onChangeIpAddress = (val) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        ipAddress: val
      };
    });
  }

  render (){
    return (
      <View style={[styles.container]}>
        <View style={[styles.container2, styles.resultContainer]}>
          <Text style={[globalStyles.formatTextDark]}>Digite o endereço de IP:</Text>
          <TextInput
            style={[styles.formatTextInput]}
            value={this.state.ipAddress}
            onChangeText={this.onChangeIpAddress}
          />
        </View>
        <View style={[styles.container2, styles.resultContainer]}>
          <Button
            title={'Sincronizar'}
            onPress={this.synchronizeData}
            style={[globalStyles.formatButtonMedium]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 40,
    margin: 5,
    flexDirection:'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    flex: 1,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatTextInput: {
    width: 200,
    fontSize: 30,
  }
});

export { SynchronizeDataScreen };
