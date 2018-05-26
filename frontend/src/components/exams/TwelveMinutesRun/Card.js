import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardView from 'react-native-cardview';
import { Button } from 'react-native-elements'

class Card extends Component {
  constructor(props){
    super(props);

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
                Voltas: 0
            </Text>
            <Text style={styles.text}>
                Metros: 200M
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={styles.buttonContainer}>
            <Button
                title="Subtrair"
                backgroundColor='red'
                icon={{name: 'minus-circle', type: 'font-awesome', size: 20}}
                borderRadius={15}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Adicionar"
                backgroundColor='green'
                icon={{name: 'plus-circle', type: 'font-awesome', size: 20}}
                borderRadius={15}
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
    padding: 20,
    width: 300
  },
  buttonContainer: {
    // width: '30%',
    height: 40,
    margin: 5
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  number: {
    fontSize: 30,
    color: 'black'
  }
});

export { Card };
