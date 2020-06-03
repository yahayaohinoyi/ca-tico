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
import {useEffect, useState} from 'react'
import firebase from 'firebase'

import CustomButton from './components/button'
import Card from './components/card'
import Instruction from './screens/instruction'
import Home from './screens/home'
import GameScreen from './screens/game'

const App: () => React$Node = () => {
  const [data, setData] = useState({})


  useEffect(() => {
    // const firebaseConfig = {
    //   apiKey: "AIzaSyApb-7v_tDdCY3unQZgIIaFRizBPlLPwFU",
    //   authDomain: "caotico-b8650.firebaseapp.com",
    //   databaseURL: "https://caotico-b8650.firebaseio.com",
    //   projectId: "caotico-b8650",
    //   storageBucket: "caotico-b8650.appspot.com",
    //   messagingSenderId: "785688806738",
    //   appId: "1:785688806738:web:a322a8ce85ae3f9e49a68b",
    //   measurementId: "G-3MTKKNNEWJ"
    // };
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(firebaseConfig);
    // }else{
    //   firebase.app()
    // }
    // firebase.database().ref('arr').on('value', (data)=>{
    //   console.log(data.toJSON())
    //   setData(data)
    // })

  }, [])


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style = {styles.containerStyle}>
        <GameScreen/>  
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    containerStyle : {
        flex: 1
    }
});

export default App;
