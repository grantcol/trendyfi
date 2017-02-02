/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Navigator
} from 'react-native';
import PostList from './PostList.js';
import Form from './Form.js';
import Navbar from './Navbar.js';
import LoginScene from './LoginScene.js';

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const routes = [
      {title: 'Login', index: 0},
      {title: 'Home', index: 1},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this.navigatorRenderScene}
        navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) =>
                { return (<Text></Text>); },
               RightButton: (route, navigator, index, navState) =>
                 {
                   if(index == 1)
                    return (<Text></Text>);
                 },
               Title: (route, navigator, index, navState) =>
                 { return (<Text>{route.title}</Text>); },
             }}
             style={{backgroundColor: 'gray'}}
           />
        }
      />
    );
  }

  navigatorRenderScene(route, navigator) {
      const routes = [
        {title: 'Login', index: 0},
        {title: 'Home', index: 1},
      ];
      _navigator = navigator;
      switch (route.index) {
        case 0:
          return <LoginScene
            title={route.title}

            // Function to call when a new scene should be displayed
            onNext={() => {
              const nextIndex = route.index + 1;
              navigator.push(routes[nextIndex]);
            }}

            // Function to call to go back to the previous scene
            onPrevious={() => {
              const nextIndex = route.index - 1;
              if (route.index > 0) {
                navigator.pop();
              } else {
                navigator.push(routes[nextIndex]);
              }
            }}
          />
        case 1:
          return <PostList/>
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 22,
  }
});

AppRegistry.registerComponent('AppContainer', () => AppContainer);
