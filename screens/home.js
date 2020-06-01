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

import CustomButton from '../components/button'


const Home = (props) => {
    
    return (
      <>
        <View style = {{backgroundColor: '#264653', flex: 1}}>
            <View style = {{justifyContent: "flex-end", flexDirection: 'row', flex: 0.1, marginRight: 30, marginTop: 30}}>
                <Text style = {styles.smallText}>
                    RANK: 
                </Text>
                <Text style = {styles.smallText}>
                    1
                </Text>
            </View>
            <View style = {{alignItems: 'center' , marginBottom: 100, flex: 0.3}}>
                <View style = {{marginTop: 20, marginBottom: 2}}>
                    <Text style = {{fontSize: 72, fontWeight: '700', color: '#171727'}}>caótico</Text>
                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom: 50}}>
                    <Text style = {{fontSize: 14, color: '#FFF'}}> Hello </Text>
                    <Text style = {{fontSize: 14, color: '#FFF'}}> Yahaya</Text>
                </View>
                <View>
                    <Text style = {{fontSize: 25, color: '#FFF'}}>
                        master 1
                    </Text>
                </View>
            </View>

            <View style = {{alignItems: 'center', flex: 0.4}}>
                <CustomButton text = 'PLAY GAME'/>
                <CustomButton text = 'LEADERBOARD'/>
                <CustomButton text = 'INSTRUCTION'/>
                <CustomButton text = 'SETTINGS'/>
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

  export default Home