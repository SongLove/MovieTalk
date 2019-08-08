

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

const REQUSET_URL = 'https://douban-api.now.sh/v2/movie/subject/'

class Details extends React.Component {
  constructor(props) {
    super(props)
  }
  fetchData = () => {
    fetch(`${REQUSET_URL + this.props.id}`)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
      })
  }
  render() {
    return (
      <View></View>
    )
  }
}

export default Details