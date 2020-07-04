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

const CustomButton = (props) => {
    
    return (
      <>
        <TouchableOpacity style = {styles.buttonStyle} onPress = {props.onPress}>
            <Text style = {{fontSize: 22, color: '#171727'}}>
                {props.text}
            </Text>

        </TouchableOpacity>
      </>
    );
  };
  
  const styles = StyleSheet.create({
      buttonStyle : {
          height: 50,
          width: 290,
          backgroundColor: '#fff',
          borderRadius: 45,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          marginTop: 10
      }
  });

  export default CustomButton