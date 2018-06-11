import React, { Component } from 'react';
import { Logo } from '../common';
import { TwelveMinutesRun } from '../exams';

class TwelveMinutesRunScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ("Avaliador: " + navigation.getParam('name', 'Invalid Name')),
    headerRight: <Logo />
  });

  render (){
    return (
      <TwelveMinutesRun navigation={this.props.navigation} />
    );
  }
}

export { TwelveMinutesRunScreen };
