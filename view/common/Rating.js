/*
 * @Description: 星级评论组件
 * @version: 0.1.0
 * @Company: 
 * @Author: AmandaYi
 * @Date: 2018-10-25
 * @LastEditors: AmandaYi
 * @LastEditTime: 2018-10-25 
 */
/**
 * @param {最大星级,如果不传,默认是5,值为5} this.props.maxRating
 * @param {星级,如果不传,默认是满级,值为5} this.props.rating
 * @param {是否可编辑,如果不传,默认是不可编辑,值为false} this.props.editable
 * @param {接收的函数,如果不传递,那么不会传递出去,只会什么都不做} this.props.selectStar
 */
import React, { Component } from "react";
import { View, StyleSheet, FlatList, Image, Text } from "react-native";
import styleCom from '../style/common'

const styles = StyleSheet.create({
  xingList: {
    backgroundColor: '#fff'
  },
  ratingVolume: {
    width: 120,
    height: 15,
    backgroundColor: '#000'
  },
  rating: {
    width: 20,
    height: 20,
    margin: 1
  },
  listRating: {
    width: 15,
    height: 15,
    margin: 1
  }
})
class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: Math.round(this.props.rating)
    }
    this.ratingArr = []
    this.maxRating = 5
    this.setRatingChange()
  }
  // 改变状态
  setRatingChange = () => {
    this.ratingArr = ratingChange(this.state.rating, this.maxRating)
  }
  ratingImage = (item) => {
    if (item.status) return <Image key={item.index} style={styles.rating} source={require('../icon/1line.png')} />
    else return <Image key={item.index} style={styles.rating} source={require('../icon/0line.png')} />
  }
  render = () => {
    return (
      <View style={styles.ratingList}>
        <FlatList
          extraData={this.state}
          data={this.ratingArr}
          horizontal={true}
          renderItem={({ item }) => this.ratingImage(item)}
        />
      </View>
    )
  }
}

function ratingChange(arr, maxRating = 5) {
  let ratingArr = Array.from({ length: maxRating }).map((item, index) => {
    if (arr > index) {
      return {
        status: true,
        index,
        level: index + 1
      }
    } else {
      return {
        status: false,
        index,
        level: index + 1
      }
    }
  })
  return ratingArr
}

class RatingList extends Component {
  constructor(props) {
    super(props)
    // 评星列表数
    this.details = this.props.details
    // 评星列表总数
    this.sum = this.props.sum
  }
  ratingList = (item, index) => {
    // 转换为5的倍数
    this.ratingArr = ratingChange(item.index + 1)
    console.log(this.ratingArr, item, index, 'this.ratingArr')
    return (
      <View key={index} style={[styleCom.fr, styleCom.jb, styles.xingList]}>
        <View>
          <FlatList
            extraData={this.state}
            data={this.ratingArr}
            renderItem={this.ratingImage}
            horizontal={true}
          />
        </View>
        <View>
          {/* <FlatList
            extraData={this.state}
            data={this.details}
            renderItem={this.ratingVolume}
          /> */}
          <View style={styles.ratingVolume}></View>
          {/* <Text>1111</Text> */}
        </View>
      </View>
    )
  }
  ratingImage = ({ item }, index) => {
    console.log(item, 'item')
    if (item.status) return <Image key={item.index} style={styles.listRating} source={require('../icon/1line.png')} />
    else return <Image key={item.index} style={styles.listRating} source={require('../icon/0line.png')} />
  }
  render() {
    return (
      <View>
        <FlatList
          extraData={this.state}
          data={this.details}
          renderItem={this.ratingList}
        />
      </View>
    )
  }
}
export { Rating, RatingList }
