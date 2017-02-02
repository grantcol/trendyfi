import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TextInput, AsyncStorage } from 'react-native';

export default class LoginScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: ''
    };
    this.submit = this.submit.bind(this);
  }


  submit() {
    var data = this.state;

    return fetch('http://localhost:8888/api/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
        username: data.username
      })
    })
    .then((response) => {
      if(response.status == 200) {
        var json = response.json();
        console.log('authenticated!', json);
        //AsyncStorage.setItem("currentUser", json._id);
        this.props.onNext();
        //return json;
      } else if(response.status == 404) {
        console.log('failed to authenticate');
        //return response;
      }
    })
    /*.then((responseJson) => {
      console.log('recieved response', responseJson);
      return responseJson;
    })*/
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}> Username </Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(text) => this.setState({ username: text })}
        />
        <Text style={styles.label}> Password </Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableHighlight onPress={this.submit}>
          <View>
            <Text style={styles.button}> Login </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

LoginScene.propTypes = {
  title: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
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
