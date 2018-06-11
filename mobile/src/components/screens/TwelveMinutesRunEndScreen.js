import React, { Component } from 'react';
import { Logo } from '../common';
import { TwelveMinutesRunEnd } from '../exams';

class TwelveMinutesRunEndScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  render (){
    let results = this.props.navigation.getParam('results');
    let arr = [];
    for(var i = 0 ; i < results.length ; i++){
        arr.push(results[i]);
    }
    return (
      <TwelveMinutesRunEnd arr={arr} />
    );
  }
}

export { TwelveMinutesRunEndScreen };
