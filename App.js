/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

import MovieList from './view/common/MovieList';
import USBox from './view/common/USBox';
import WmTab from './view/common/WmTab';

class MovieTalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'Home',
    };
  }
  onTabChange(tab) {
    if (this.state.tab !== tab) {
      this.setState({ tab });
    }
  }
  renderContent() {
    switch (this.state.tab) {
      case 'Home': {
        return <MovieList />;
      }
      case 'USB': {
        return <USBox />;
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <WmTab
          callbackParent={val => {
            this.onTabChange(val);
          }}
        />
        <View style={styles.content}>{this.renderContent()}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'column-reverse',
  },
  content: {
    flex: 1,
  },
});

export default MovieTalk;
