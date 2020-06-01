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

const Instruction = (props) => {
    
    return (
      <>
        <View style = {{backgroundColor : '#264653', flex: 1}}>
            <View style = {{alignItems: 'flex-end', paddingVertical: 10, paddingBottom: 20, paddingRight: 35}}>
                <Text style = {styles.bigText}>
                    INSTRUCTION
                </Text>
            </View>

            <View style = {{marginVertical: 40, marginHorizontal: 10}}>
                <Text style = {styles.smallText}>
                    The numbers or alphabets in the poll are to be arranged
                    in ascending or descending order depending on the
                    instruction at the base of the screen
                </Text>
            </View>
            <View style = {{marginVertical: 40, marginHorizontal: 10}}>
                <Text style = {styles.smallText}>
                    To get a point, click all cards following the corresponding
                    instruction at the base of the screen before the timer
                    for that round elapses
                </Text>
            </View>
            <View style = {{marginVertical: 40, marginHorizontal: 10}}>
                <Text style = {styles.smallText}>
                    To deselect a box, click on already selected box
                </Text>
            </View>
        </View>
      </>
    );
  };

  const styles = StyleSheet.create({
      bigText : {
          fontSize: 25,
          color: '#FFF'
      },
      smallText : {
          fontSize: 20,
          color: '#FFF'
      }
  })
  export default Instruction
