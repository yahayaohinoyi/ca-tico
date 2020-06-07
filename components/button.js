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
            <Text style = {{fontSize: 22, color: '#FFF'}}>
                {props.text}
            </Text>

        </TouchableOpacity>
      </>
    );
  };
  
  const styles = StyleSheet.create({
      buttonStyle : {
          height: 63,
          width: 302,
          backgroundColor: '#171727',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          marginTop: 10
      }
  });

  export default CustomButton