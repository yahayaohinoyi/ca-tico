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
import LinearGradient from 'react-native-linear-gradient'
import LocalStorage from '../localStorage/localStorage'
import {FireBaseContext} from '../store/getdata'
var localName = new LocalStorage()



const Home = (props) => {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [dataContext, setDataContext] = useContext(FireBaseContext)
    useEffect(() => {
   
    const getName = async id => {
        try{
          var myName = await localName._retrieveData('name')
          // console.log(myName)
          if(typeof(myName) === 'string'){
            setName(myName)
          }
          else{
            setName(dataContext[uniqueId]['userName'])
            await localName._storeData('name', dataContext[uniqueId]['userName'])
          }
        }
        catch(err){
          
        }

      }
      getName()
      try{
        
      }
      catch(err){

      }

      }, [dataContext])

    return (
      <>
        <LinearGradient colors={['#5E6366', '#4E656E', '#49859A']} style = {{flex: 1}}>
          <SafeAreaView style = {{flex: 1}}>
            <View style = {{justifyContent: "flex-end", flexDirection: 'row', flex: 0.1, marginRight: 30, marginTop: 30}}>
                {/* <Text style = {styles.smallText}>
                    RANK: 
                </Text>
                <Text style = {styles.smallText}>
                    1
                </Text> */}
            </View>
            <View style = {{alignItems: 'center' , marginBottom: 100, flex: 0.3}}>
                <View style = {{marginTop: 20, marginBottom: 2}}>
                  <Text style = {{fontFamily: 'Bangers-Regular', fontSize: 70}}>caótico{' '}</Text>
                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom: 50}}>
                    <Text style = {{fontSize: 14, color: '#FFF'}}> Hello </Text>
                    <Text style = {{fontSize: 14, color: '#FFF'}}> {name} </Text>
                </View>
                {/* <View>
                    <Text style = {{fontSize: 25, color: '#FFF'}}>
                         master 1
                    </Text>
                </View> */}
            </View>

            <View style = {{alignItems: 'center', flex: 0.4}}>
                <CustomButton text = 'ARCADE' onPress = {() => props.navigation.navigate('GameScreenModal')}/>
                <CustomButton text = 'LEADERBOARD' onPress = {() => props.navigation.navigate('LeaderBoardModal')}/>
                <CustomButton text = 'MULTIPLAYER' onPress = {() => props.navigation.navigate('MultiplayerGameScreen')}/>
                <CustomButton text = 'INSTRUCTION' onPress = {() => props.navigation.navigate('Instruction')}/>
            </View>
            </SafeAreaView>

        </LinearGradient>
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
        },
        caoticoText: {
          fontSize: 70,
          fontFamily:'NixieOne-Regular',
          fontWeight: '700',
          color: '#171727'
        }
    })

  export default Home