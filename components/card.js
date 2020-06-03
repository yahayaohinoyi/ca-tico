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
import * as Animatable from 'react-native-animatable';


const Card = (props) => {

    return (
      <>
        <Animatable.View animation = 'bounceIn' style = {{marginLeft: props.marginLeft}}>
                <TouchableOpacity style = {props.handleCardStyle} onPress = {props.clickCard}>
                    <Text style = {props.handleTextStyle}>
                        {props.num}
                    </Text>
                </TouchableOpacity>
        </Animatable.View>
      </>
    );

    
  };


  export default Card