

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
  SectionList,
  Dimensions,
  TouchableHighlight,
  DeviceEventEmitter
} from 'react-native';

const { width } = Dimensions.get('window');
import Video from '../common/VideoBox'

const REQUSET_URL = 'https://douban-api.now.sh/v2/movie/subject/'
let textWidth
import { Rating, RatingList } from './Rating'

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
      loaded: false,
      section: [
        { title: "简介", data: ["item1", "item2"] },
        { title: "评论", data: ["item3", "item4"] },
        { title: "讨论", data: ["item5", "item6"] },
        { title: "更多", data: ["item5k", "item6r"] },
        { title: "不知道1", data: ["item51", "item6e"] },
        { title: "更多s", data: ["item52", "item6g"] },
        { title: "更多f", data: ["item55", "item6f"] },
        { title: "更多sf", data: ["item45", "item65"] }
      ]
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
          <Rating rating={average ? average / 2 : 5} />
        </View>
        <Text><Text>淘票票评分 </Text> {this.WannaSee(comments, true)}</Text>
      </View>
    )
  }
  ratingList = (details) => {
    // details 为五条数据  还需要一个总数和
    let sum = 0
    let arr = []
    for (let i in details) {
      sum += details[i]
      arr.push(details[i])
    }
    return (
      <RatingList details={arr} sum={sum} />
    )
  }
  onBuffer = () => {

  }
  videoError = (err) => {
    console.log(err, '报错信息')
  }
  render() {
    textWidth = width / this.state.section.length
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
        <View style={styles.prevue}>
          <Video videoUri={detail.trailer_urls[0]} />
        </View>
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
            <View style={[styles.gradeBox, styleCom.afc, styleCom.js]}>
              {this.ratingList(detail.rating.details)}
            </View>
          </View>
          {/** 详情列表 */}
          {/* <View style={[styles.discuss, styleCom.fr]}>
            <Text style={styles.discussText}>简介</Text>
            <Text style={styles.discussText}>评论</Text>
            <Text style={styles.discussText}>讨论</Text>
            <Text style={styles.discussText}>更多</Text>
          </View> */}

          <FlatList
            ref={(ref) => {
              this._flatListRef = ref
            }}
            extraData={this.state}
            data={this.state.section}
            horizontal={true}
            renderItem={({ item, index }) => {
              console.log(item, index, 'asfsa')
              return <Text onPress={this.TextItemClick}
                key={index}
                style={styles.discussText}>{item.title}</Text>
            }}
            keyExtractor={(item, index) => item + index}
          /> 

          {/** 列表内容 */}

          <SectionList
            ref={(ref) => { this._listRef = ref }}
            renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: "bold" }}>{title}</Text>
            )}
            sections={this.state.section}
            onViewableItemsChanged={(info) => this.itemChange(info)}
            keyExtractor={(item,index) => item+index}
          />
        </View>
      </ScrollView >
    )
  }
  itemChange = (info) => {
    // 取出第一个数据的title
    let title = info.viewableItems[0].item.title
    console.log(title, '滑动时调用的', info.viewableItems[0])
  }
  TextItemClick = ({ index }) => {
    this._listRef.scrollToLocation(
      {
        itemIndex: 0,
        sectionIndex: index,
        viewOffset: 30
      }
    );
  }
  componentWillMount = () => {
    console.log('componentWillMount')
    // 使用一个实例接收发送事件
    this.listener = DeviceEventEmitter.addListener('list', (e) => {
      //this._flatListRef
      console.log('监听list', e)
    })
  }
  componentWillUnmount = () => {
    // 移除监听
    this.listener.remove()
  }
}

const styles = StyleSheet.create({
  discussText: {
    height: 30,
    width: 40,
    textAlign: 'center',
    alignSelf: 'center'
  },
  discuss: {
    flex: 1,
    height: 30,
    backgroundColor: '#000'
  },
  sectionList: {
    flex: 1,
    height: 150,
    backgroundColor: '#fff'
  },
  average: {
    width: 50,
    fontSize: 30
  },
  gradeBox: {
    width: 200,
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
    position: 'relative',
    height: 200
  },
  container: {
    backgroundColor: '#eae7ff',
    flex: 1
  }
})

export default Details