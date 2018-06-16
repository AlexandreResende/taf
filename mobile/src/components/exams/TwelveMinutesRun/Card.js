import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Modal } from 'react-native';
import CardView from 'react-native-cardview';
import { Signature } from '../../common';
import { Button } from 'react-native-elements';

class Card extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.setState({
      laps: 0,
      meters: 0,
      showModalWindow: false,
      candidateSignature: "",
      signed: "Não",
      appraiserSignature: this.props.appraiserSignature,
      appraiserName: this.props.appraiserName,
    }, () => this.saveData() );
  }

  increaseNumberOfLaps() {
    this.setState({
      laps: this.state.laps + 1
    }, () => this.saveData() );
  }

  decreaseNumberOfLaps() {
    this.setState({
      laps: (this.state.laps == 0) ? 0 : this.state.laps - 1
    }, () => this.saveData() );
  }

  clearIfZero() {
    this.setState({
      meters:( this.state.meters == 0) ? '' : this.state.meters
    })
  }

  changeText(text){
    this.setState({
      meters: text
    }, () => this.saveData() );
  }

  saveData(){
    this.props.saveData(this.props.candidateNumber,this.state.laps,this.state.meters,this.state.candidateSignature,this.props.appraiserSignature,this.props.appraiserName);
  }

  onSave(result){
    if(result != null) {
      this.setState({
        candidateSignature: result.encoded,
        signed: "Sim"
      }, () => this.saveData());
    } else {
      this.setState({
        candidateSignature: "",
        signed: "Não"
      }, () => this.saveData());
    }
  }
  
  render() {
    return (
      <CardView
        cardElevation={5}
        cardMaxElevation={0}
        cornerRadius={6}
        style={styles.card}>
        <View>
          <View>
            <Text style={styles.text}>
                Numero do candidato: <Text style={styles.number}>{this.props.candidateNumber}</Text>
            </Text>
            <Text style={styles.text}>
                Voltas: <Text style={styles.number}>{this.state.laps}</Text>
            </Text>
            <Text style={styles.text}>
                Assinado: <Text >{this.state.signed}</Text>
            </Text>
            <View style={styles.metersContainer}>
              <Text style={styles.text}>
                  Adicional: 
              </Text>
              <TextInput
                style={{ width: 40 }}
                onChangeText={(text) => this.changeText(text) }
                maxLength={4}
                keyboardType='numeric'
                value={this.state.meters.toString()}
                onFocus={ () => this.clearIfZero() }
              />
              <Text style={styles.text}>
                metros
              </Text>
            </View>
          </View>

          <Modal visible={this.state.showModalWindow} animationType="slide" 
            transparent={false}
            onRequestClose={() => { alert('Modal has been closed.'); }}>
            <View style={[styles.container, {marginTop:20, marginLeft:'auto', marginRight:'auto'}]}>
              <Text style={styles.formatText}>Assinatura do candidato</Text>
              <View style={styles.signatureBox}> 
                <Signature ref='signature' saveOnDrag={true} onSave={this.onSave.bind(this)} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title='Limpar' onPress={() => { 
                  this.refs.signature.resetSign(); 
                  this.setState({
                    candidateSignature: "",
                    signed: "Não"
                  }, () => this.saveData());
                }}/>
                <View style={{width:20}}/>
                <Button title='Salvar' onPress={() => {
                    this.setState((prevState) => { 
                      return { showModalWindow: false }
                    });
                  }}/>
              </View>
            </View>
          </Modal>

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <Button 
                title="Assinar" 
                backgroundColor='blue'
                borderRadius={15}
                onPress={() => { this.setState((prevState) => { return { showModalWindow: true } } ) }}
              />
            </View>
            <View style={styles.buttonContainer}>
            <Button
                title="Subtrair"
                backgroundColor='red'
                icon={{name: 'minus-circle', type: 'font-awesome', size: 20}}
                borderRadius={15}
                onPress={ () => this.decreaseNumberOfLaps() }
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Adicionar"
                backgroundColor='green'
                icon={{name: 'plus-circle', type: 'font-awesome', size: 20}}
                borderRadius={15}
                onPress={ () => this.increaseNumberOfLaps() }
              />
            </View>
          </View>
          <View style={styles.buttonsContainer}>

          </View>
        </View>
      </CardView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 5,
    width: 350
  },
  buttonContainer: {
    height: 40,
    margin: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  number: {
    fontSize: 28,
    color: 'black'
  },
  metersContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureBox: {
    marginTop:10,
    borderWidth: 1,
    borderRadius: 10,
    width: 550,
    height: 205,
  },
  formatText: {
    color: 'black',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
});

export { Card };
