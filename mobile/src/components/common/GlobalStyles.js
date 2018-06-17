import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  formatTitle: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  formatTextDark: {
    fontSize: 25,
    color: '#222222',
  },
  formatTextLight: {
    fontSize: 25,
    color:'white',
  },
  inputCandidateNumber:{
    width: '11%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  examNameContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatButtonLarge: {
    backgroundColor: "#1AA9E2",
    width: 300,
    height: 45,
    borderColor: "#1AA9E2",
    borderWidth: 0,
    borderRadius: 10,
  },
  formatButtonMedium: {
    backgroundColor: "#1AA9E2",
    width: 100,
    height: 45,
    borderColor: "#1AA9E2",
    borderWidth: 0,
    borderRadius: 10,
  },
  formatButton: {
    backgroundColor: "#1AA9E2",
    borderColor: "#1AA9E2",
    borderWidth: 0,
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  backgroundGreen: {
    backgroundColor: '#1fbd82'
  },
});

export { globalStyles };