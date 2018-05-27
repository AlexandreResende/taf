
import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AbdominalPushUpsComponent } from './AbdominalPushUpsComponent/AbdominalPushUpsComponent';

class PushUpsExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examName: 'Abdominal',
    };
  }

  render() {
    return (
      <AbdominalPushUpsComponent 
        examName={this.state.examName}
      />
    );
  }
}

export { PushUpsExam };
