import React, { Component } from 'react';
import { View, Text, Easing, StyleSheet } from 'react-native';
import Drawer from 'react-native-drawer';
import MenuPanel from './MenuPanel';
import styles from './styles';

class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset:500,
      closedDrawerOffset:0,
      panOpenMask: .1,
      panCloseMask: .9,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: false,
      negotiatePan: false,
      side: "left",
    };
  }

  setDrawerType(type){
    this.setState({
      drawerType: type
    })
  }

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  noopChange(){
    this.setState({
      changeVal: Math.random()
    })
  }

  openDrawer(){
    this.drawer.open()
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {
    const menuPanel = <MenuPanel closeDrawer={() => {
        this.drawer.close();
      }} />

    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
      main: {paddingLeft: 3},
    }
    
    return (
      <Drawer
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={menuPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.side}
      >
       <View>{this.props.component}</View>
      </Drawer>
    );
  }
}

export default Menu;
