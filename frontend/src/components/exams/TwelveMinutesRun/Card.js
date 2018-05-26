import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import CardView from 'react-native-cardview';

class Card extends Component {
  render() {
    return (
      <CardView
        cardElevation={5}
        cardMaxElevation={0}
        cornerRadius={6}
        style={styles.card}>
        <View>
          <View>
            <Text>
                Test Card
            </Text>
            <Text >
                Number: 12
            </Text>
            <Text >
                CardCard
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={styles.button}>
              <Button
                title="-1 Volta"
                color='red' 
              />
            </View>
            <View style={styles.button}>
              <Button
                title="+1 Volta"
                color='green'
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
  button: {
    width: '30%',
    height: 40,
    margin: 5
  }
});

export { Card };
