import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Logo } from '../common';
import { Storage } from '../../helper/storage/localMongodb';
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

  renderRows = () => {
    const result = db.find({}, (err, docs) => {
      const docsArray = []
      for (let doc of docs) {
        console.log('aki');
        console.log(doc);
        const { name, number, result } = doc;
        docsArray.concat(<Row data={[name, number, result]}></Row>)
      }
      return docsArray;
    });
    console.log(result);
    return result;
    /* const content = [];
    const storage = new Storage();
    const docs = storage.loadFromLocalStorage();
    console.log(docs);

    return Promise
      .all([docs])
      .then((documents) => {
        for (let doc of documents) {
          this.setState({
            ...this.state,
            tableRows: this.state.tableRows.push([doc[0].name, doc[0].number, doc[0].result]),
          });
        }
      })
      .catch(console.log); */
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Table>
            <Row data={this.state.tableHead}></Row>
          </Table>
        </View>
        <ScrollView>
          <Table>
            {this.renderRows()}
          </Table>
        </ScrollView>
      </ScrollView>
    );
  }
}

export { ListCandidatesInfoScreen };
