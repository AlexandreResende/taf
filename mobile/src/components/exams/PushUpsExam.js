
import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AbdominalPushUpsComponent } from './AbdominalPushUpsComponent/AbdominalPushUpsComponent';

class PushUpsExam extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AbdominalPushUpsComponent 
        examName='Flexão'
      />
    );
  }
}

export { PushUpsExam };
