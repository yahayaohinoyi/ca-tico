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

import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react'; 

import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
let uniqueId = DeviceInfo.getUniqueId();
console.log(uniqueId)

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

import {Store} from './store/getdata'
import CustomButton from './components/button'
import Card from './components/card'
import Instruction from './screens/instruction'
import Home from './screens/home'
import GameScreenModal from './components/modal'
import LeaderBoardModal from './components/changeUserModal'
import MultiplayerGameScreen from './multiplayer/multiplayerGame'



const Stack = createStackNavigator();
const pubnub = new PubNub({
  publishKey: 'pub-c-6ca7c8fb-75cf-4d29-bb5b-f29ed5c6c1c9',
  subscribeKey: 'sub-c-778fc06a-ba77-11ea-bcf8-42a3de10f872',
});
const channels = ['awesomeChannel'];


const App = () => {

  return (
    <>

    <PubNubProvider client = {pubnub}>
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
                <Stack.Screen
                  name="MultiplayerGameScreen"
                  component={MultiplayerGameScreen}
                  options = {{headerShown: false}}/> 
            </Stack.Navigator>
          </NavigationContainer>
        </Store>
      </PubNubProvider>
    </>
  );
};

const styles = StyleSheet.create({
    containerStyle : {
        flex: 1
    }
});

export default App;
