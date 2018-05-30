
import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AbdominalPushUpsComponent } from './AbdominalPushUpsComponent/AbdominalPushUpsComponent';

class AbdominalExam extends Component 
{
  constructor(props) {
    super(props);
  }

  render() 
  {
    return (
      <AbdominalPushUpsComponent 
        examName={'Abdominal'}
      />
    );
  }
}

export { AbdominalExam };
