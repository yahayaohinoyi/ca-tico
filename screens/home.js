import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import firebase from 'firebase'
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
let uniqueId = DeviceInfo.getUniqueId();
// console.log(uniqueId)
import CustomButton from '../components/button'
import {useState, useEffect, useContext} from 'react'


const Home = (props) => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    useEffect(() => {
      const firebaseConfig = {
      apiKey: "AIzaSyApb-7v_tDdCY3unQZgIIaFRizBPlLPwFU",
      authDomain: "caotico-b8650.firebaseapp.com",
      databaseURL: "https://caotico-b8650.firebaseio.com",
      projectId: "caotico-b8650",
      storageBucket: "caotico-b8650.appspot.com",
      messagingSenderId: "785688806738",
      appId: "1:785688806738:web:a322a8ce85ae3f9e49a68b",
      measurementId: "G-3MTKKNNEWJ"
      };
      if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      }else{
      firebase.app()
      }
      firebase.database().ref('users').limitToFirst(20).on('value', (out)=>{           
      out = out.toJSON()
    //   console.log(out)
      setData(out)
      setName(out[uniqueId]['userName'])
    //   var obj = out[uniqueId]['userName']
    //   console.log(obj['userName'])
     
      })
    }, [])

    return (
      <>
        <SafeAreaView style = {{backgroundColor: '#5E6472', flex: 1}}>
            <View style = {{justifyContent: "flex-end", flexDirection: 'row', flex: 0.1, marginRight: 30, marginTop: 30}}>
                <Text style = {styles.smallText}>
                    RANK: 
                </Text>
                <Text style = {styles.smallText}>
                    1
                </Text>
            </View>
            <View style = {{alignItems: 'center' , marginBottom: 100, flex: 0.3}}>
                <View style = {{marginTop: 20, marginBottom: 2}}>
                    <Text style = {{fontSize: 72, fontWeight: '700', color: '#171727'}}>caótico</Text>
                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom: 50}}>
                    <Text style = {{fontSize: 14, color: '#FFF'}}> Hello </Text>
                    <Text style = {{fontSize: 14, color: '#FFF'}}> {name} </Text>
                </View>
                <View>
                    <Text style = {{fontSize: 25, color: '#FFF'}}>
                         master 1
                    </Text>
                </View>
            </View>

            <View style = {{alignItems: 'center', flex: 0.4}}>
                <CustomButton text = 'PLAY GAME' onPress = {() => props.navigation.navigate('GameScreenModal')}/>
                <CustomButton text = 'LEADERBOARD' onPress = {() => props.navigation.navigate('LeaderBoardModal')}/>
                <CustomButton text = 'MULTIPLAYER' onPress = {() => props.navigation.navigate('MultiplayerGameScreen')}/>
                <CustomButton text = 'INSTRUCTION' onPress = {() => props.navigation.navigate('Instruction')}/>
            </View>

        </SafeAreaView>
      </>
    );
  };


const styles = StyleSheet.create({
        bigText : {
            fontSize: 25,
            color: '#FFF'
        },
        smallText : {
            fontSize: 20,
            color: '#FFF'
        }
    })

  export default Home