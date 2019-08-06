import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

// 自定义文字组件
class HeaderText extends React.Component {
  render() {
    return (
      <Text style={styles.itemTitle}>
        {this.props.children}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 30,
    fontFamily: 'Helvetica Neue',
    color: '#000',
    padding: 30
  }
})

module.exports = {
  HeaderText
}