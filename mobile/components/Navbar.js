/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onRightItemClick = this.onRightItemClick.bind(this);
    this.onLeftItemClick = this.onLeftItemClick.bind(this);
  }

  onRightItemClick() {
    this.props.onRightItemClick();
  }

  onLeftItemClick() {
    this.props.onLeftItemClick();
  }

  render() {
    return (<View style={styles.container}><Text> TrendyFi! </Text></View>);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: 30
  },
  rightItem: {},
  leftItem: {},
  brand: {}
});

AppRegistry.registerComponent('Navbar', () => Navbar);
