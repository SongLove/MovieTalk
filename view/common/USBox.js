/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

let REQUEST_URL = 'https://douban-api.now.sh/v2/movie/us_box'
class USBox extends React.Component {
  static navigationOptions = {
    title: '电影详情',
    headerTintColor: '#000'
  }
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loaded: false
    }
    this.fetchData()
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          movies: responseData.subjects,
          loaded: true
        })
      })
  }
  // item点击
  TouchOnPress(e) {
    console.log(e)
  }
  // 电影组件
  renderMovieList({ item, index }) {
    item = item.subject
    return (
      <TouchableHighlight underlayColor='rgba(34, 26, 38, 0.1)' onPress={() => {
      }}>
        <View key={index} style={styles.movieContent}>
          <Image style={styles.movieCover} source={{ uri: item.images.large }} />
          <View style={styles.movieMsg}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieType}>{item.genres}</Text>
            <Text style={[styles.movieStars, styles.movieTitle]}>{item.rating.average}</Text>
            <View style={styles.moviePubdates}><Text>{item.pubdates}</Text></View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#6435c9" />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          extraData={this.state}
          data={this.state.movies}
          renderItem={this.renderMovieList}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  movieTitle: {
    fontWeight: '300',
    fontFamily: 'Helvetica Neue',
    fontSize: 18
  },
  movieStars: {
    color: '#db2828'
  },
  movieMsg: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  moviePubdates: {
    height: 55,
    justifyContent: 'flex-end'
  },
  movieContent: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(100,53,201,0.1)',
    flex: 1,
  },
  movieCover: {
    width: 100,
    height: 140,
    marginRight: 15
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,255,0.3)',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 33,
    fontWeight: '300',
    color: '#fff',
    padding: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  image: {
    width: 99,
    height: 138,
  },
  item: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6435c9',
    margin: 6,
    borderRadius: 5
  },
  itemOne: {},
  itemTwo: {},
  itemThree: {},
  itemTitle: {
    fontSize: 30,
    fontFamily: 'Helvetica Neue',
    color: '#6432c9',
    padding: 30
  },
  title: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 2,
    lineHeight: 33
  },
  container: {
    backgroundColor: '#eae7ff',
    flex: 1,
    padding: 10
  }
})


export default USBox;

