import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Logo } from '../common';
import Storage from '../../helper/storage/localMongodb';
const Datastore = require('react-native-local-mongodb');
const db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

class ListCandidatesInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Nome do Exame','Número do Candidato','Resultado'],
      tableRows: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  renderRows = async () => {
    /* const examsInfo = [];
    await db.find({}, (err, docs) => {
      if (err) {
        throw err;
      }
      for (let doc of docs) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(doc);
        examsInfo.push(<Row key={Math.random()} data={[doc.name, doc.number, doc.result]}></Row>);
      }
    });
    console.log(examsInfo);
    return examsInfo; */
    return [];
  }

  render (){
    return (
      <ScrollView>
        <View>
          <Table>
            <Row data={this.state.tableHead}></Row>
          </Table>
        </View>
        <ScrollView>
          <Table>
            {this.renderRows}
          </Table>
        </ScrollView>
      </ScrollView>
    );
  }
}

export { ListCandidatesInfoScreen };
