/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, TouchableHighlight, StyleSheet, Modal } from 'react-native';
import Post from './Post.js';
import Form from './Form.js';

export default class PostList extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    //this.fetchPosts();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      modalVisible: false,
      dataSource: ds.cloneWithRows([
        {
          "name": "Dan Mehler",
          "img": "https://s-media-cache-ak0.pinimg.com/564x/a0/3e/5a/a03e5ac2ee763c20820b91294e6fa95e.jpg",
          "price": "$2.00",
          "location": "Grocery Outlet (Oakland, CA)",
          "comment": "“Healthy” soda alternative for soda and non soda drinkers alike to enjoy and not die slowly. gucci ingredients only, no HFC or any of that fake shit. real spices and agave included for #flavorwhores. great for mix drinks (i.e. bourbon, rum, etc.) would be a 5 star rating but i dont drink soda unless alcohol is included (subjective).",
          "title": "Q Kola",
          "rating": 4
        },
        {
          name: 'Daniel Mehler',
          img: 'https://s-media-cache-ak0.pinimg.com/564x/a0/3e/5a/a03e5ac2ee763c20820b91294e6fa95e.jpg',
          price: '$9.00',
          location: "Beauty's Bagels (Oakland, CA)",
          comment: "Cant go wrong with beauty's wood fired bagels, so dont miss this fried chicken sandwich, chicken is on point and beet slaw compliments the flavor perfectly ***disclaimer: lovely lass not included",
          title: 'Everything Bagel Sandwhich w/ organic fried chicken & creamy beet slaw',
          rating: 5
        },
        {
          name: 'Daniel Mehler',
          img: 'https://s-media-cache-ak0.pinimg.com/564x/a0/3e/5a/a03e5ac2ee763c20820b91294e6fa95e.jpg',
          price: '$8.00',
          location: "Home Depot (Oakland, CA)",
          comment: "bamboo is awesome, not top notch quality but a killer deal for a set of 3. add oil to the boards here and there and they will last",
          title: 'Bamboo cutting boards (3 set)',
          rating: 5
        },
        {
          name: 'Daniel Mehler',
          img: 'https://s-media-cache-ak0.pinimg.com/564x/a0/3e/5a/a03e5ac2ee763c20820b91294e6fa95e.jpg',
          price: '$19.00',
          location: "Home Depot (Emeryville, CA)",
          comment: "Great set of blades with an awesome ceramic coating. Sharp, a knife for each basic kitchen need that all definitely do the job. Colors are neat. Misleading branding (i.e. 12 piece set, 6 knives and 6 sheaths). Cut corners on quality i.e. cheap plastic handles.",
          title: 'Cuisinart Advantage Kitchen Knives (6 set)',
          rating: 4
        },
        {
          name: 'Daniel Mehler',
          img: 'https://s-media-cache-ak0.pinimg.com/564x/a0/3e/5a/a03e5ac2ee763c20820b91294e6fa95e.jpg',
          price: '$8.00',
          location: "Shop N Kart (Ashland, OR)",
          comment: "750 mL. Delicious, golden, light, a bit tart, excellent flavor exceeds expectations. This farmhouse ale is definitely worth trying (at least once!), especially if you can find on a special.",
          title: 'Goose Island “Sofie” Farmhouse Ale (750ml)',
          rating: 5
        }
      ])
    };
    //this.setState({ dataSource: ds.cloneWithRows(this.fetchPosts())})
  }
  /*
Title: Q Kola Price: $2 Location: Grocery Outlet (Oakland, Ca) Rating: 4 Notes: “healthy” soda alternative for soda and non soda drinkers alike to enjoy and not die slowly. gucci ingredients only, no HFC or any of that fake shit. real spices and agave included for #flavorwhores. great for mix drinks (i.e. bourbon, rum, etc.) would be a 5 star rating but i dont drink soda unless alcohol is included (subjective).
Title: Everything Bagel Sandwich w/ organic fried chicken & creamy beet slaw Price: $9 Location: Beauty's Bagels (Oakland, Ca) Rating: 5 Notes: cant go wrong with beauty's wpod fired bagels, so dont miss this fried chicken sandwich, chicken is on point and beet slaw compliments the flavor perfectly ***disclaimer: lovely lass not included
  */
  componentDidMount() {
    this.fetchPosts();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  fetchPosts() {
    return fetch('http://localhost:8888/api/posts', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('recieved responsed', responseJson);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({dataSource: ds.cloneWithRows(responseJson)});
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    console.log('ds ds ds', this.state.dataSource);
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <Form setModalVisible={() => this.setModalVisible(false)}/>
        </Modal>

        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={ (rowData) => <Post data={rowData} /> }
        />
        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
            <Text style={styles.button} >Post</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  button: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('PostList', () => PostList);
