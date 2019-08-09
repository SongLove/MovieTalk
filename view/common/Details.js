

import React from 'react';
import styleCom from '../style/common'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

const REQUSET_URL = 'https://douban-api.now.sh/v2/movie/subject/'

class Details extends React.Component {
  static navigationOptions = {
    title: '详情信息',
    headerTintColor: '#000'
  }
  constructor(props) {
    super(props)
    const { navigation } = this.props;
    const detailId = navigation.getParam('detailId');
    console.log(detailId)
    this.state = {
      detailId
    }
    this.fetchData()
    this.state = {
      detailsId: this.props.navigation.getParam('id'),
      detail: {},
      loaded: false
    }
  }
  fetchData = () => {
    fetch(`${REQUSET_URL + this.state.detailId}`)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
        this.setState({
          detail: responseData,
          loaded: true
        })
      })
  }
  genres = (detail) => {
    let arr = detail.genres.concat(detail.countries, detail.durations)
    return arr.join('   ')
  }
  WannaSee = (num, type) => {
    let msg = '人想看'
    if (type) {
      msg = '评论+'
    }
    if (num < 10000) {
      return `${num} ${msg}`
    } else {
      let newNum = num / 10000
      return `${newNum.toFixed(1)} 万${msg}`
    }
  }
  /**
   * @param average 评分
   * @param comments 评论人数
   */
  rating = (average, comments) => {

    return (
      <View>
        <View style={styleCom.fr}>
          <Text style={styles.average}>{average}</Text>
          <View style={[styles.rating]}>
          </View>
        </View>
        <Text><Text>淘票票评分 </Text> {this.WannaSee(comments, true)}</Text>
      </View>
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
      );
    }
    let detail = this.state.detail
    console.log(detail.images.large)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/** 预告视频 */}
        <View style={styles.prevue}></View>
        {/** 头部标题 */}
        <View style={styles.content}>
          <View style={styles.movieIntro}>
            <View style={styles.movieCoverBox}>
              <Image style={styles.movieCover} source={{ uri: detail.images.large }} />
            </View>
            <View style={styles.movieMsg}>
              <View style={{ alignSelf: 'flex-start' }}>
                <Text style={styles.movieTile}>{detail.title}</Text>
                <Text style={styles.movieAka}>{detail.aka}</Text>
              </View>
              <View style={{ alignSelf: 'flex-end' }}>
                <Text>{this.genres(detail)}</Text>
                <Text>{detail.pubdates}</Text>
                <Text>{this.WannaSee(detail.wish_count)}</Text>
              </View>
            </View>
          </View>
          {/** 评分 */}
          <View style={styles.grade}>
            <View style={styles.gradeNum}>
              {this.rating(detail.rating.average, detail.comments_count)}
            </View>
            <View style={styles.gradeBox}></View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  rating: {
  },
  average: {
    width: 50,
    fontSize: 30
  },
  gradeBox: {
    width: 200,
    backgroundColor: '#f0f'
  },
  gradeNum: {
    width: 165,
    backgroundColor: '#fff'
  },
  grade: {
    height: 100,
    backgroundColor: '#00f',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  movieAka: {
    color: '#ddd',
    height: 70
  },
  movieTile: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieMsg: {
    width: 240,
    padding: 5,
    backgroundColor: '#0ff'
  },
  movieCover: {
    flex: 1,
    borderRadius: 8
  },
  movieCoverBox: {
    width: 125,
    padding: 3,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  movieIntro: {
    height: 190,
    backgroundColor: '#f0f',
    marginTop: -80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  content: {
    backgroundColor: '#0f0',
    paddingLeft: 15,
    paddingRight: 15,
    height: 500
  },
  prevue: {
    height: 200,
    backgroundColor: '#000'
  },
  container: {
    backgroundColor: '#eae7ff',
    flex: 1
  }
})

export default Details