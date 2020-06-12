import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {useEffect, useState, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

import {Store} from './store/getdata'
import CustomButton from './components/button'
import Card from './components/card'
import Instruction from './screens/instruction'
import Home from './screens/home'
import GameScreenModal from './components/modal'
import LeaderBoardModal from './components/changeUserModal'

const Stack = createStackNavigator();

const App = () => {

  return (
    <>
    <Store>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
              name="Home"
              component={Home}
              options = {{headerShown: false}}/> 
              <Stack.Screen
              name="GameScreenModal"
              component={GameScreenModal}
              options = {{headerShown: false}}
                />
              <Stack.Screen 
                name="Instruction"
                component={Instruction}
                options = {{headerShown: false}} /> 
              <Stack.Screen 
                name="LeaderBoardModal"
                component={LeaderBoardModal}
                options = {{headerShown: false}} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </Store>
    </>
  );
};

const styles = StyleSheet.create({
    containerStyle : {
        flex: 1
    }
});

export default App;
