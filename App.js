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
import {SafeAreaView, createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
// import { Navigator } from 'react-native-deprecated-custom-components';
//引用导航栏组件
// import {StackNavigator} from 'react-navigation';

import MovieList from './view/common/MovieList';
import USBox from './view/common/USBox';
import WmTab from './view/common/WmTab';
//定义导航栏
// export const SimpleApp = StackNavigator({
//   MovieList: { screen: MovieList },
//   USBox: { screen: USBox },
// });

class MovieTalk extends React.Component {
  static navigationOptions = {
    title: '热门电影',
    headerTintColor: '#000',
    headerTitleStyle: {
      flex:1,
      textAlign: 'center'
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      tab: 'Home'
    };
  }
  onTabChange(tab) {
    if (this.state.tab !== tab) {
      this.setState({ tab });
    }
  }
  renderContent() {
    console.log(this.state.tab)
    switch (this.state.tab) {
      case 'Home': {
        return <MovieList callbackParent={() => {
          this.props.navigation.navigate('USBox')
        }} />;
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
        <SafeAreaView style={styles.content}>{this.renderContent()}</SafeAreaView>
      </View>
    );
  }
}
const AppNavigator = createStackNavigator({
  MovieTalk: {
    screen: MovieTalk,
  },
  USBox: {
    screen: USBox,
  },
}, {
    initialRouteName: 'MovieTalk',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });

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

export default createAppContainer(AppNavigator);
