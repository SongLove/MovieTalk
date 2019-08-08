

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
    const { navigation } = this.props;
    const detailId = navigation.getParam('detailId');
    console.log(detailId)
    this.state = {
      detailId
    }
    this.fetchData()
    // this.state = {
    //   detailsId: this.props.navigation.getParam('id')
    // }
  }
  fetchData = () => {
    fetch(`${REQUSET_URL + this.state.detailId}`)
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