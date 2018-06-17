import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Logo } from '../common';
import { Storage } from '../../helper/storage/localMongodb';
const Datastore = require('react-native-local-mongodb');
const db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

class ListCandidatesInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Nome do Exame','Número do Candidato','Resultado', 'Reteste'],
      tableRows: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  componentDidMount() {
    this.renderRows();
  }

  renderRows = async () => {
    const storage = new Storage();
    const docs = await storage.loadFromLocalStorage();
    const dataArray = [];

    for (let doc of docs) {
      console.log([doc.name, doc.number, doc.result, doc.retest.toString()]);
      dataArray.push([doc.name, doc.number, doc.result, doc.retest.toString()]);
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        tableRows: dataArray,
      };
    });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Table>
            <Row data={this.state.tableHead}></Row>
            <Rows data={this.state.tableRows}></Rows>
          </Table>
        </View>
      </ScrollView>
    );
  }
}

export { ListCandidatesInfoScreen };
