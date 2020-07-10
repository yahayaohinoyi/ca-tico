import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';
  
import {useState, useEffect, useContext} from 'react';
import Leaderboard from 'react-native-leaderboard';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
let uniqueId = DeviceInfo.getUniqueId();
import {FireBaseContext} from '../store/getdata'
import LinearGradient from 'react-native-linear-gradient'
import LocalStorage from '../localStorage/localStorage'



const LeaderBoard = (props) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const dataContext = useContext(FireBaseContext)[0]
    // console.log(dataContext)
    useEffect(() => {
        var myData = Object.values(dataContext)
        setData(myData)
    }, [dataContext])

    useEffect(()=> {
        if(data.length > 0){
            setLoading(false)
        }
    }, [data])


    const renderActivityIndicator = () => {      
        if(loading){
            return(
                <LinearGradient colors={['#5E6366', '#4E656E', '#49859A']} style = {{flex: 1}}>
                    <ActivityIndicator size="large" color="#0c9" style = {styles.loader}/>
                </LinearGradient>
            )
        }
        else{
            return (
                <Leaderboard 
                    data={data} 
                    labelStyle = {{fontFamily:'Bangers-Regular'}}
                    scoreStyle = {{fontFamily:'Bangers-Regular'}}
                    sortBy='highScore' 
                    containerStyle = {{flex: 1, backgroundColor: 'black'}}
                    labelBy='userName'
                    oddRowColor = '#51626A'
                    evenRowColor = '#4E656F'
                        />
            )
        }
    }

    return(
        <>
            <LinearGradient style = {{flex: 1}} colors={['#5E6366', '#4E656E', '#49859A']}>
                <SafeAreaView style = {{flex: 1}}>

                     <View style = {{flex: 0.15, backgroundColor: '#51626A', flexDirection: 'row',justifyContent:'space-around', alignItems: 'center'}}>
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
                    <View style = {{flex: 0.8,justifyContent: 'center'}}> 
                        {renderActivityIndicator()}
                    </View>

                <View style = {{flexDirection: 'row', marginRight: 35,paddingTop: 10, justifyContent:'flex-end', alignItems: 'center'}}>
                    <Text style = {{fontSize: 24, fontWeight: '900', color: '#171727', fontFamily:'Bangers-Regular'}}>caótico{' '}</Text>
                </View>

             </SafeAreaView>
             </LinearGradient>
        
            
        
        
        </>
    )
}


const styles = StyleSheet.create({
    deleteStyle : {
        height: 35,
        width: 130,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textStyle : {
        color: '#fff'
    },
    loader : {
        justifyContent: "center",
        alignItems: "center",
       }


})
export default LeaderBoard