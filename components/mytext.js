import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const AppText = (props) => {
    return (
      <>
        <View style = {styles.buttonStyle}>
            <Text style = {styles.textStyle}>
                {props.text}
            </Text>
        </View>
      </>
    );
  };


const style = StyleSheet.create({
    textStyle = {
        fontFamily : 'Roboto'
    }
})

export default AppText;