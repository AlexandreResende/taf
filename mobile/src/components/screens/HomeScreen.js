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
    // console.log('Appraiser Signature: ' + this.props.navigation.getParam('appraiserSignature'));
    return (
      <ScrollView>
        <View style={[styles.parent]}>
          <TouchableOpacity 
            style={[styles.child, {backgroundColor: '#996666'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('TwelveMinutesRun',{
                name: this.props.navigation.getParam('name', 'Invalid Name'),
                appraiserSignature: this.props.navigation.getParam('appraiserSignature','')
              })
            }}
          >
            <View style={styles.container}>
              <Image style={{ width: 96, height: 114, resizeMode: 'contain' }} source={require('../../images/12min.png')}/>
              <Text style={styles.title}>Prova dos 12 Minutos</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.child, {backgroundColor: '#339966'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('HeightExam', {
                name: this.props.navigation.getParam('name', 'Invalid Name'),
                appraiserSignature: this.props.navigation.getParam('appraiserSignature','')
              })
            }}
          >
            <View style={styles.container}>
              <Image style={{ width: 105, height: 131, resizeMode: 'contain' }} source={require('../../images/alt.png')}/>
              <Text style={styles.title}>Prova de altura</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.child, {backgroundColor: '#996633'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('AbdominalExam', {
                name: this.props.navigation.getParam('name', 'Invalid Name'),
                appraiserSignature: this.props.navigation.getParam('appraiserSignature','')
              })
            }}
          >
            <View style={styles.container}>
              <Image style={{ width: 158, height: 135, resizeMode: 'contain' }} source={require('../../images/abdom.png')}/>
              <Text style={styles.title}>Prova dos abdominais</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.child, {backgroundColor: '#669933'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('PushUpsExam', {
                name: this.props.navigation.getParam('name', 'Invalid Name'),
                appraiserSignature: this.props.navigation.getParam('appraiserSignature','')
              })
            }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Prova das flexões</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.child, {backgroundColor: '#669933'} ]} 
            onPress={() => { this.props.navigation.navigate('FiftyMetersRun', { 
              name: this.props.navigation.getParam('name', 'Invalid Name'),
              appraiserSignature: this.props.navigation.getParam('appraiserSignature','')
            })        
          }}>
            <View style={styles.container}>
              <Image style={{ width: 104, height: 106, resizeMode: 'contain' }} source={require('../../images/50met.png')}/>
              <Text style={styles.title}>Prova dos 50 metros</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.child, {backgroundColor: '#996666'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('ListCandidatesInfo',{
                name: this.props.navigation.getParam('name', 'Invalid Name'),
              })
            }}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Ver Dados</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.child, {backgroundColor: '#996666'} ]} 
            onPress={ () => {
              this.props.navigation.navigate('SynchronizeData',{
                name: this.props.navigation.getParam('name', 'Invalid Name'),
              })
            }}
          >
            <View style={styles.container}>
              <Image style={{ width: 166, height: 118, resizeMode: 'contain' }} source={require('../../images/sync.png')}/>
              <Text style={styles.title}>Sincronizar</Text>
            </View>
          </TouchableOpacity>
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
      elevation: 5,
      
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
    color: 'white'
  }
})

export { HomeScreen };

/*
<Menu component={<Text>Home</Text>} navigation={this.props.navigation}/>

            <TouchableOpacity>
              <Text>Here</Text>
            </TouchableOpacity>
*/