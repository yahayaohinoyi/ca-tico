import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity
  } from 'react-native';
  
import {useState, useEffect} from 'react';

import Leaderboard from 'react-native-leaderboard';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';

let uniqueId = DeviceInfo.getUniqueId();
// console.log(uniqueId)

const LeaderBoard = (props) => {
    const [data, setData] = useState([
                {userName: 'Kibutsuji', highScore: 52},
                {userName: 'Jenny', highScore: 120},
                {userName: 'Joe', highScore: 42},
                {userName: 'Onas', highScore: 32},
                {userName: 'Tesla', highScore: 22},
            ],
    )

    return(
        <>
                <SafeAreaView style = {{flex: 1}}>
                     <View style = {{flex: 0.15, backgroundColor: '#0F99BD', flexDirection: 'row',justifyContent:'space-around', alignItems: 'center'}}>
                     <TouchableOpacity
                        style = {styles.deleteStyle}
                        onPress = {props.onPress}
                       >
                        <Text style = {{color: '#fff'}}>
                            Change Username
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.deleteStyle}>
                        <Text style = {{color: '#fff'}}>
                            Delete Account
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style = {{flex: 0.82}}> 
                    <Leaderboard 
                        data={data} 
                        sortBy='highScore' 
                        labelBy='userName'
                    />
                </View>
                <View style = {{flexDirection: 'row', marginRight: 35,paddingTop: 10, justifyContent:'flex-end', alignItems: 'center'}}>
                    <Text style = {{fontSize: 24, fontWeight: '900', color: '#171727'}}>caótico</Text>
                </View>

             </SafeAreaView>
        
            
        
        
        </>
    )
}


const styles = StyleSheet.create({
    deleteStyle : {
        height: 35,
        width: 140,
        backgroundColor: 'red',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textStyle : {
        color: '#fff'
    }


})
export default LeaderBoard