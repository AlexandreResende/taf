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
          <Text style={{backgroundColor:'yellow'}}>
              Test Card
          </Text>
          <Text >
              Number: 12
          </Text>
          <Text >
              CardCard
          </Text>
          <Button
            title="UP"
          />
        </View>
      </CardView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
    padding: 20
  }
});

export { Card };
