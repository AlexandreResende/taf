import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CardView from 'react-native-cardview';
import { Button } from 'react-native-elements'

class Card extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.setState({
      laps: 0,
      meters: 0
    });
  }

  increaseNumberOfLaps() {
    this.setState({
      laps: this.state.laps + 1
    })
  }

  decreaseNumberOfLaps() {
    this.setState({
      laps: (this.state.laps == 0) ? 0 : this.state.laps - 1
    })
  }

  clearIfZero() {
    this.setState({
      meters:( this.state.meters == 0) ? '' : this.state.meters
    })
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
            <View style={styles.metersContainer}>
              <Text style={styles.text}>
                  Adicional: 
              </Text>
              <TextInput
                style={{ width: 40 }}
                onChangeText={(text) => this.setState({ meters : text}) }
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
          <View style={styles.buttonsContainer}>
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
        </View>
      </CardView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    width: 300
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
    fontSize: 20,
    fontWeight: 'bold'
  },
  number: {
    fontSize: 30,
    color: 'black'
  },
  metersContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export { Card };
