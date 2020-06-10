import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView
} from "react-native";

import GameScreen from '../screens/game'


const GameScreenModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false); 
  const [gameKey, setGameKey] = useState(0)

  const handleCompleteTime = () => {
    setModalVisible(true)
  }


  return (
        <View style = {{flex: 1}}>
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
                    <Text style={styles.modalText}>YOU LOSE</Text>

                    <View style = {{flexDirection: "row"}}>
                        <TouchableHighlight
                        style={{ ...styles.openButton,marginRight:50, backgroundColor: "#08377C" }}
                        onPress={() => {      
                            // setNewTime(10)
                            setModalVisible(false)
                            setGameKey(gameKey + 1)
                            
                            }}
                        >
                        <Text style={styles.textStyle}>Play Again</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#E1594C" }}
                        onPress={() => {
                            setModalVisible(false)
                            props.navigation.popToTop('Home')}}
                        >
                        <Text style={styles.textStyle}>Go to Menu</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                </View>
            </Modal>
                <View style = {{flex: 1}}>
                    <GameScreen key={gameKey} handleCompleteTime = {handleCompleteTime} />

                </View>
            
        </View>
        
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
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
    borderRadius: 3,
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
  }
});

export default GameScreenModal;
