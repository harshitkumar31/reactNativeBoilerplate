/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {
  StackNavigator,
  addNavigationHelpers,
} from 'react-navigation';

import {Provider, connect} from 'react-redux';
import {configureStore} from './store/configureStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const Home = (props) => (<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Profile!
        </Text>
        
        <Text style={styles.instructions}>
          To get started, edit index.android.js.
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>);

const AppNavigator = StackNavigator({
      Home: { screen: Home },
      About: { screen: Home },
});


@connect(state => ({
    nav: state.nav
}))
class AppWithNavigationState extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const initialState = {};

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

const store = configureStore(initialState, navReducer);

export default class reactNativeBoilerplate extends Component {
  render() {
    return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
    );
  }
}

AppRegistry.registerComponent('reactNativeBoilerplate', () => reactNativeBoilerplate);
