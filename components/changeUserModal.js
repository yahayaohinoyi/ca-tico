import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from "react-native";
import {useEffect, useState, useContext} from 'react'

import LeaderBoard from './leaderboard'

const LeaderBoardModal = () => {
    const [modalVisible, setModalVisible] = useState(false);


    const onPress = () =>{
        setModalVisible(true)
    }
  

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter a Username</Text>

            <View style = {{alignItems: 'center', justifyContent:'center'}}>
                <TextInput style = {[styles.inputStyle, {marginBottom: 15}]}>

                </TextInput>
                <View style = {{flexDirection:'row'}}>
                    <TouchableHighlight
                    style={{ ...styles.openButton,marginRight:50, backgroundColor: "#08377C" }}
                    onPress={() => {
                        setModalVisible(false)
                        }}
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
          </View>
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
    backgroundColor: "white",
    borderRadius: 8,
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
    color: '#E1594C'
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
