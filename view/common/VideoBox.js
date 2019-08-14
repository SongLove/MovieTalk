import React from 'react';
import styleCom from '../style/common'
import Icon from "react-native-vector-icons/Ionicons"
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Video from 'react-native-video';
const { width } = Dimensions.get('window');

export default class VideoBox extends React.Component {
  constructor(props) {
    super(props)
    this.videoUri = this.props.videoUri
    this.state = {
      rate: 1,//播放速率
      volume: 1,
      muted: true,//静音
      resizeMode: 'contain',
      paused: false,//暂停
      videoError: false,//错误
      duration: 0.0,
      currentTime: 0.0,
      videoLoaded: false,
      playing: false,
      playEnd: false,
      player: {},
      showCover: true // 是否显示封面
    }

    // this._onLoadStart = this._onLoadStart.bind(this);
    // this._onLoad = this._onLoad.bind(this);
    //this._onProgress = this._onProgress.bind(this);
    // this._onEnd = this._onEnd.bind(this);
    // this._onError = this._onError.bind(this);
  }
  _onLoadStart = (res) => {
    console.log('_onLoadStart', res)
  }
  _onLoad = (data) => {
    console.log('_onLoad--视频总长度' + data.duration);
    this.setState({
      duration: data.duration,
      videoLoaded: true,
      paused: true
    });
    // 设置视频播放的位置（从0秒开始）
    console.log(this.video, 'player')
  }
  _onProgress = (data) => {
    console.log(data, '_onProgress')
    if (!this.state.playing && !this.state.playEnd) {
      console.log('进来改变状态');
      this.setState({
        playEnd: false,
        playing: true,
      });
    }

    this.setState({ currentTime: data.currentTime });
    //console.log('_onProgress---当前时间'+data.currentTime);
  }
  _onEnd = () => {
    this.setState({
      playing: false,
      paused: true,
      playEnd: true,
    })
    console.log('结束了');
  }
  _onError = (error) => {
    console.log('错误' + JSON.stringify(error))
    this.setState({
      videoError: true,
    })
  }
  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }
  _pop = () => {
    let { navigator } = this.props;
    if (navigator) {
      navigator.pop();
    }
  }
  _pause = () => {

    this.setState({
      paused: !this.state.paused
    });
  }
  _resume = () => {
    this.setState({
      paused: !this.state.paused
    });

  }
  _rePlay = () => {
    this.setState({
      playEnd: false,
      paused: false,
    })
    this.refs.videoPlayer.seek(0);
  }
  onBuffer = () => {

  }
  videoError = () => {

  }
  _onPress = () => {
    console.log('video 点击')
    this.setState({
      paused: true,
      showCover: false
    })
  }
  render() {
    //一个是当前时间,一个是剩余时间
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    return (
      <View>
        <Video
          ref={(ref) => { //方法对引用Video元素的ref引用进行操作
            console.log('ref', ref)
            this.video = ref
          }}
          source={{ uri: this.videoUri }}
          style={styles.video}
          onBuffer={this.onBuffer}
          onError={this.videoError}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          repeat={false}
          ref='videoPlayer'
          onLoadStart={this._onLoadStart}
          onLoad={this._onLoad}
          onProgress={this._onProgress}
          onEnd={this._onEnd}
          onError={this._onError}
        />
        {/*错误提示*/}
        {this.state.videoError ?
          <Text style={styles.failText}>很抱歉,你访问的视频飞走了...</Text>
          : null
        }
        <TouchableHighlight
          style={styles.videoBox}
          underlayColor="rgba(34, 26, 38, 0.1)"
          onPress={this._onPress}>
          <View></View>
        </TouchableHighlight>

        {/*小菊花*/}
        {!this.state.videoLoaded ?
          <ActivityIndicator
            color="red"
            size="large"
            style={styles.loading}
          />
          : null
        }

        {/*播放按钮*/}
        {!this.state.playing && this.state.videoLoaded ?
          // <Icon name='caretright'
          //   size={45}
          //   color='red'
          //   style={styles.play}
          //   onPress={this._rePlay} />
          <Text onPress={this._rePlay} style={styles.play}>222</Text>
          : null
        }

        {/*暂停&&继续*/}
        {this.state.videoLoaded && this.state.paused ?
          // <Icon name='pausecircle'
          //   size={45}
          //   color='red'
          //   style={styles.play}
          //    onPress={this._resume} />
          <View style={styles.coverBox}>
            {this.state.showCover ?
              <Image style={styles.videoCover} source={{ uri: 'https://baconmockup.com/300/200/' }} />
              : null}
            <Text onPress={this._resume} style={styles.play}>0110</Text>
          </View>
          : null
        }


        {/*进度条*/}
        {/* <View style={styles.progress}>
          <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
          <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
        </View> */}
      </View>
    )
  }
}
let videoBoxHeight = 250;
let videoHeight = videoBoxHeight - 10;
let loadingTop = videoBoxHeight * 0.5 - 30;
let playWH = 60;
let playTop = videoBoxHeight * 0.5 - playWH * 0.5;
let failTextTop = videoBoxHeight * 0.5 + playWH * 0.5;

const styles = StyleSheet.create({
  coverBox: {
    position: 'absolute',
    width: width,
    height: videoBoxHeight,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  videoCover: {
    width: width,
    height: videoBoxHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  videoBox: {
    position: 'absolute',
    width: width,
    height: videoBoxHeight,
  },
  video: {
    width: width,
    height: videoHeight,
    backgroundColor: 'black'
  },
  loading: {
    position: 'absolute',
    top: loadingTop,
    width: width,
    left: 0,
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
    width: width,
    top: 50,
  },
  innerProgressCompleted: {
    height: 10,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 10,
    backgroundColor: '#2C2C2C',
  },
  play: {
    position: 'absolute',
    top: playTop,
    left: width * 0.5 - playWH * 0.5,
    width: playWH,
    height: playWH,
    paddingTop: 10,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: playWH * 0.5,
    color: 'red'
  },
  pauseStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: videoHeight,
  },
  failText: {
    position: 'absolute',
    left: 0,
    width: width,
    top: failTextTop,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: 'red',
    fontSize: 20,
  },
  navStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 64,
    backgroundColor: '#dddddd',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  backBox: {
    position: 'absolute',
    left: 12,
    top: 25,
    width: 60,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    fontSize: 22,
    marginRight: 5
  },
  backText: {
    fontSize: 16
  },
  navText: {
    textAlign: 'center',
    lineHeight: 64,
    height: 64,
    fontSize: 18,
    width: width - 120,
  },
  infoBox: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    marginLeft: 10
  },
  descBox: {
    flex: 1,
  },
  nickname: {
    fontSize: 18,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  replyBox: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    marginTop: 10,
  },
  replyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10
  },
  reply: {
    flex: 1
  },
  replyNickname: {
    fontSize: 16,
  },
  replyContent: {
    marginTop: 5,
    paddingRight: 10

  }
})