/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, StyleSheet, TouchableHighlight } from 'react-native';

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      location: '',
      comment: '',
      user: ''
    };
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    this.props.setModalVisible();
    this.submit();
  }

  submit() {
    var data = this.state;
    return fetch('http://localhost:8888/api/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: data
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('recieved response', responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    console.log('hi hi ', this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.label}> Description </Text>
        <TextInput
          style={styles.input}
          placeholder="input here"
          onChangeText={(text) => this.setState({ title: text })}
        />
        <Text style={styles.label}> Price </Text>
        <TextInput
          style={styles.input}
          placeholder="input here"
          onChangeText={(text) => this.setState({ price: text })}
        />
        <Text style={styles.label}> Location </Text>
        <TextInput
          style={styles.input}
          placeholder="input here"
          onChangeText={(text) => this.setState({ location: text })}
        />
        <Text style={styles.label}> Name </Text>
        <TextInput
          style={styles.input}
          placeholder="input here"
          onChangeText={(text) => this.setState({ user: text })}
        />
        <Text style={styles.label}> Comment </Text>
        <TextInput
          style={styles.input}
          placeholder="input here"
          onChangeText={(text) => this.setState({ comment: text })}
        />
        <TouchableHighlight onPress={this._onPressButton}>
          <View>
            <Text style={styles.button}> Submit </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#1C1C1C'
  },

  input: {
    padding: 5,
    fontSize: 12,
    height: 40,
    color: 'white',
    backgroundColor: '#161616',
    borderRadius: 4,
    marginBottom: 12
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 7
  },

  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});

AppRegistry.registerComponent('Form', () => Form);
