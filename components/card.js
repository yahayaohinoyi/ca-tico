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
import {useState, useEffect} from 'react'

const Card = (props) => {

    return (
      <>
        <View style = {{marginLeft: props.marginLeft}}>
                <TouchableOpacity style = {props.handleCardStyle} onPress = {props.clickCard}>
                    <Text style = {props.handleTextStyle}>
                        {props.num}
                    </Text>
                </TouchableOpacity>
        </View>
      </>
    );

    
  };


  export default Card