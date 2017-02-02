import React , { Component } from 'react';
import Icon from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { AppRegistry, View, Text, StyleSheet, TouchableHighlight, Image, AsyncStorage } from 'react-native';

export default class Post extends Component {

  constructor(props){
      super(props);
      this.onLike = this.onLike.bind(this);
  }

  onLike() {
    var id = this.props.data._id;
    AsyncStorage.getItem("currentUser")
    .then((value) => {
      console.log(value);
      submit(value._id, id);
    }).done();
  }

  submit(user_id, post_id) {

    return fetch('http://localhost:8888/api/vote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        post_id: post_id
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
    const data = this.props.data;
    console.log('DATA', data);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image resizeMode='cover' style={styles.userImage} source={{uri: 'https://placehold.it/50x50'}}/>
          <View style={styles.headerInfo}>
            <Text style={styles.userInfo}>
              { data.name }
            </Text>
            <Text style={styles.location}>
              { data.location }
            </Text>
          </View>
        </View>
        <View style={styles.photoContainer}>
          <Image resizeMode='cover' source={{ uri: 'https://pbs.twimg.com/profile_images/451207149478096896/HoMUOmyu.jpeg' }} style={styles.photo} />
        </View>
        <View style={styles.bg}></View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>
             { data.title }
          </Text>
          <Text style={styles.price}>
             { data.price }
          </Text>
          {/*<Text style={styles.text}>
             { data.price } @ { data.location }
          </Text>
          <Text style={styles.text}>
             { data.comment }
          </Text>
          <Text style={styles.userInfo}>
             { data.name }
          </Text>
          */}
          <TouchableHighlight onPress={this.onLike}>
            <Icon name="heart" size={30} color="#f00" />
            {/*<View>
              <Text style={styles.button}> Like </Text>
            </View>*/}
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginBottom: 10
  },

  text: {
    fontSize: 10
  },

  bg: {
    flex: 1,
    position: 'absolute',
    left: 12,
    top: 275,
    opacity: 0.5,
    backgroundColor: 'black',
    zIndex: 5,
    height: 45,
    width: 350
  },

  infoContainer: {
    flex: 1,
    position: 'absolute',
    left: 12,
    top: 275,
    height: 46,
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 6
  },

  userInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginRight: 100,
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginRight: 100,
    paddingLeft: 10
  },

  photoContainer: {
    flex: 1,
    alignItems: 'stretch',
    marginBottom: 5
  },

  photo: {
    height: 250,
    width: null,
    borderRadius: 4
  },

  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },

  header: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row'
  },

  headerInfo: {
    flexDirection: 'column',
    marginTop: 7
  },

  location: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  userImage: {
    height: 50,
    borderRadius: 25,
    width: 50,
    marginRight: 10
  }
});

AppRegistry.registerComponent('Post', () => Post);
