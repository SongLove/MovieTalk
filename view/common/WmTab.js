import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

class WmTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tab: 'home-first' };
  }

  onTabSelect(tab) {
    if (this.state.tab !== tab) {
      this.setState({ tab: tab });
      this.props.callbackParent(tab);
    }
  }

  render() {
    const image = [require('../icon/monitor.png'),
    require('../icon/monitor.png'),
    require('../icon/monitor.png')];

    const imageSelect = [require('../icon/test.png'),
    require('../icon/test.png'),
    require('../icon/test.png')];

    const str = ['报志愿', '高考攻略', '我的'];

    return (
      <View style={styles.container} key={this.state.tab}>
        <View style={styles.tab}>
          <TouchableHighlight style={styles.tabItem}
            onPress={this.onTabSelect.bind(this, 'Home')}>
            <View style={styles.tabItem}>
              <Image style={styles.image}
                source={this.state.tab === 'Home' ? imageSelect[0] : image[0]} />
              <Text style={[styles.text, { color: this.state.tab === 'Home' ? '#00aff0' : '#9E9EAE' }]}>
                {str[0]}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.tabItem}
            onPress={this.onTabSelect.bind(this, 'USB')}>
            <View style={styles.tabItem}>
              <Image style={styles.image}
                source={this.state.tab === 'USB' ? imageSelect[1] : image[1]} />
              <Text style={[styles.text, { color: this.state.tab === 'USB' ? '#00aff0' : '#9E9EAE' }]}>
                {str[1]}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.tabItem}
            onPress={this.onTabSelect.bind(this, 'home-third')}>
            <View style={styles.tabItem}>
              <Image style={styles.image}
                source={this.state.tab === 'home-third' ? imageSelect[2] : image[2]} />
              <Text style={[styles.text, { color: this.state.tab === 'home-third' ? '#00aff0' : '#9E9EAE' }]}>
                {str[2]}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderWidth:1,
    borderTopColor: '#ddd'
  },
  tab: {
    height: 49,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  image: {
    width: 30,
    height: 30
  },
  tabItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    color: '#9E9EAE',
    fontSize: 11
  }
});

export default WmTab