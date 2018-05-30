import React, { Component } from 'react';
import { Text, Button, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Entypo';
// import Menu from '../menu/Menu';
import { Logo } from '../common';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />,
    headerLeft: null
  });

  render (){
    return (
      <ScrollView>
        <View style={[styles.parent]}>
          <TouchableOpacity 
            style={[styles.child, {backgroundColor: '#996666'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('TwelveMinutesRun',{
                name: this.props.navigation.getParam('name', 'Invalid Name')
              })
            }}
          >
            <View style={styles.container}>
              <Image style={{ width: 150, height: 150, resizeMode: 'contain' }} source={require('../../images/peopleRunning.png')}/>
              <Text style={styles.title}>Prova dos 12 Minutos</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.child, {backgroundColor: '#339966'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('HeightExam', {
                name: this.props.navigation.getParam('name', 'Invalid Name')
              })
            }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Prova de Altura</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.child, {backgroundColor: '#996633'} ]} 
            style={[styles.child, {backgroundColor: '#996666'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('AbdominalExam', {
                name: this.props.navigation.getParam('name', 'Invalid Name')
              })
            }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Prova das Flexões</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.child, {backgroundColor: '#669933'} ]} 
            style={[styles.child, {backgroundColor: '#996666'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('PushUpsExam', {
                name: this.props.navigation.getParam('name', 'Invalid Name')
              })
            }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Prova dos Abdominais</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.child, {backgroundColor: '#669933'} ]} ></TouchableOpacity>
          <TouchableOpacity style={[styles.child, {backgroundColor: '#669933'} ]} ></TouchableOpacity>
       </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  parent: {
      width: '100%', 
      flexDirection: 'row', 
      flexWrap: 'wrap'
  },
  child: {
      width: '30%',
      height: 220, 
      marginLeft: '2%',
      marginRight: '1%',
      marginTop: '2%',
      marginBottom: '1%',
      borderRadius: 10,
      
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
})

export { HomeScreen };

/*
<Menu component={<Text>Home</Text>} navigation={this.props.navigation}/>

            <TouchableOpacity>
              <Text>Here</Text>
            </TouchableOpacity>
*/