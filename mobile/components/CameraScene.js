import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TextInput, AsyncStorage } from 'react-native';
import Camera from 'react-native-camera';

export default class CameraScene extends Component {

  constructor(props) {
    super(props);
    this._switchCamera = this._switchCamera.bind(this);
    this._takePicture = this._takePicture.bind(this);
    this.state = {cameraType: Camera.constants.Type.back}
  }
   
  render() {
      return (
          <Camera
              ref="cam"
              style={styles.container}
              type={this.state.cameraType}>
              <View style={styles.buttonBar}>
                  <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
                      <Text style={styles.buttonText}>Flip</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button} onPress={this._takePicture}>
                      <Text style={styles.buttonText}>Take</Text>
                  </TouchableHighlight>
              </View>
          </Camera>
      );
  }

  _switchCamera() {
      var state = this.state;
      state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
      this.setState(state);
  }

  _takePicture() {
      this.refs.cam.capture(function(err, data) {
          console.log(err, data);
      });
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    buttonBar: {
        flexDirection: "row",
        position: "absolute",
        bottom: 25,
        right: 0,
        left: 0,
        justifyContent: "center"
    },
    button: {
        padding: 10,
        color: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        margin: 5
    },
    buttonText: {
        color: "#FFFFFF"
    }
});
