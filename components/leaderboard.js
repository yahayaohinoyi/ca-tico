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




const LeaderBoard = (props) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const dataContext = useContext(FireBaseContext).data
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
                <ActivityIndicator size="large" color="#0c9" style = {styles.loader}/>
            )
        }
        else{
            return (
                <Leaderboard 
                    data={data} 
                    sortBy='highScore' 
                    labelBy='userName'
                        />
            )
        }
    }

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
                    <View style = {{flex: 0.8}}> 
                        {renderActivityIndicator()}
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
       }


})
export default LeaderBoard