import React, { Component } from "react";
import {
  Alert,
  // Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from "react-native";
import {useEffect, useState, useContext} from 'react'

import LeaderBoard from './leaderboard'
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient'
import LocalStorage from '../localStorage/localStorage'
import {FireBaseContext} from '../store/getdata'
import DeviceInfo from 'react-native-device-info';
let uniqueId = DeviceInfo.getUniqueId();


const LeaderBoardModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [leaderboardName, setLeaderboardName] = useState('')
    const [dataContext, setDataContext] = useContext(FireBaseContext)
    var localName = new LocalStorage()



    const onPress = () => {
        setModalVisible(true)

    }

    const handleSetName = (text) => {
      setLeaderboardName(text)
    }

    const handleCompleteInput = () => {
      setModalVisible(false)

      // console.log(leaderboardName)
      const setName = async id => {
        await localName._storeData('name', leaderboardName)
      }

      setName()
      try{
        let clonedDataContext = {}
        Object.assign(clonedDataContext, dataContext)
        clonedDataContext[uniqueId]['userName'] = leaderboardName
        setDataContext(clonedDataContext)
      }
      catch(err){

      }


      try{
        if(leaderboardName.length > 0){
          localName._pushNameToDataBase(leaderboardName)
        }
      }catch(err){
      }
    }
  

  return (
    <View style={{flex: 1}}>
      <Modal
        animationIn="slideInUp"
        animationOut = 'slideOutDown'
        isVisible={modalVisible}
        
      >
        <View style={styles.centeredView}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#304352', '#868D91', '#d7d2cc']} style={styles.modalView}>
            <Text style={styles.modalText}>Enter a Username</Text>

            <View style = {{alignItems: 'center', justifyContent:'center'}}>
                <TextInput style = {[styles.inputStyle, {marginBottom: 15}]}
                           onChangeText = {handleSetName}
                           />

                <View style = {{flexDirection:'row'}}>
                    <TouchableHighlight
                    style={{ ...styles.openButton,marginRight:50, backgroundColor: "#08377C" }}
                    onPress={() => 
                        handleCompleteInput()
                        }
                    >
                    <Text style={styles.textStyle}>Enter </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#E1594C" }}
                    onPress={() => {
                        setModalVisible(false)
                        }}
                    >
                    <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>
      <View style = {{flex: 1}}>
        <LeaderBoard onPress = {() => onPress()}/>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2BCBD6",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#49859A',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 6,
    height: 40,
    width: 120,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: '#fff'
  },
  inputStyle: {
      height: 37,
      width: 250,
      borderRadius: 4,
      borderColor: 'black',
      borderWidth: 1,

      
  }
});

export default LeaderBoardModal;
