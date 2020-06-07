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

import { v4 as uuidv4 } from 'uuid';
import CountDown from 'react-native-countdown-component';


import Card from '../components/card'
import {useState} from 'react'
// const obj = require('../Rules/rule')
import Stack from '../Rules/rule'
import GenerateRandom from '../Rules/fisherYates'
import * as Animatable from 'react-native-animatable';
import Modal from '../components/modal'

const GameScreen = (props) => {
    var fisher = new GenerateRandom()
    var out = fisher.output(6)
    fisher.mapOut(out)

    const [whoosh, setWoosh] = useState(whoosh)
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState(Math.floor(Math.random() * (100000 - 0)) + 0)
    const [stackObj, setStackObj] = useState(new Stack())
    const [score, setScore] = useState(0)
    const [counter, setCounter] = useState(0)
    const [arr, setArr] = useState(fisher.outArray)

    const [resetTimer, setResetTimer] = useState(8)

    const clickCard = (id) => {
        setArr(
            arr.map(item => {
                if(item.id === id){
                    
                    if(!item.clicked){
                        setCounter(counter + 1)
                        stackObj.push(item.num)
                        clickCardSoundEffect('bubble_1.mp3')

                    }
                    else{
                        setCounter(counter - 1)
                        stackObj.pop()
                        clickCardSoundEffect('unbubble.mp3')
                    }
                    item.clicked = !item.clicked
                }

                return item
            })
        )
        if (counter === arr.length - 2){
            fisher = createNewRandomInstance
        }
        if (counter === arr.length - 1){
            // console.log(stackObj.getArr())
            if(stackObj.validate()){
                setArr(fisher.outArray)
                setScore(score + 1)
                setCounter(0)
                setStackObj(new Stack())
                setResetTimer(8)
                setId(Math.floor(Math.random() * (100000 - 0)) + 0)
                console.log(id)
                changeScreenSoundEffect()
            }
            else{
                onFailRound('failed.mp3')
                setModalVisible(true)
                whoosh.pause()
            }
        }
        
    }
    const createNewRandomInstance = () => {
        var fisher = new GenerateRandom()
        var out = fisher.output(6)
        fisher.mapOut(out)
        return fisher
    }
    
    const handleCardStyle = (clicked) => {
        if (!clicked) {
            return {
                height: 80,
                width: 80,
                borderRadius: 400,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }
        }
        return {
            height: 80,
            width: 80,
            borderRadius: 400,
            backgroundColor: '#171727',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
    const handleTextStyle =(clicked) => {
        if (!clicked) {
            return {
                fontSize: 35,
                color: '#171727',
                fontWeight: '600'
            }
        }
        return {
            fontSize: 35,
            color: '#FFF',
            fontWeight: '600'
        }
        }

    const clickCardSoundEffect = (filename) => {
        var Sound = require('react-native-sound');
        Sound.setCategory('Playback');
        const dir = "/Users/mac/Documents/CODING-PROJECTS/REACT-NATIVE-PROJECTS/caotica/" + filename
        var whoosh = new Sound(dir, '', (error) => {
            if (error) {
              console.log('failed to load the sound');
              return;
            }
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
           
            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                setWoosh(whoosh)
              if (success) {
                // console.log('successfully finished playing');
              } else {
                // console.log('playback failed due to audio decoding errors');
              }
            });
          });
    }

    const changeScreenSoundEffect = () => {
        var Sound = require('react-native-sound');
        Sound.setCategory('Playback');
        var whoosh = new Sound("/Users/mac/Documents/CODING-PROJECTS/REACT-NATIVE-PROJECTS/caotica/test1.mp3", '', (error) => {
            if (error) {
              console.log('failed to load the sound');
              return;
            }
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
           
            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                setWoosh(whoosh)
              if (success) {
                // console.log('successfully finished playing');
              } else {
                // console.log('playback failed due to audio decoding errors');
              }
            });
          });
    }

    const onFailRound = (aud) => {
        clickCardSoundEffect(aud)
        setScore(0)
        setModalVisible(true)
    }

    const renderModal = () => {
        if(modalVisible){
            return <Modal modalVisible = {modalVisible} navigation = {props.navigation}/>
        }
        else{
            return <View></View>
        }
    }
 
    
    
    const renderTimer =
                <CountDown
                    id = {id.toString()}
                    until={10}
                    onFinish={() => onFailRound('failed.mp3')}
                    // onPress={() => alert('hello')}
                    size={20}
                    timeToShow={['S']}
                    digitStyle={{backgroundColor: '#5E6472'}}
                    digitTxtStyle={{color: '#fff'}}
                />
    

    
    
    
    
    return (
      <>
        <SafeAreaView style = {{flex: 1, backgroundColor: '#5E6472'}}>
            <View style = {{flex: 0.3, backgroundColor: '#FFF', borderBottomLeftRadius: 1000, borderBottomRightRadius: 1000}}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 60}}>
                    <View style = {{marginLeft: 15, marginTop: 10 }}>
                        <Text style = {{fontWeight: '900', fontSize: 20}}>caótico</Text>
                    </View>
                    <View style = {{marginRight: 15, marginTop: 40}}>
                        <Text style = {{color: '#264653', fontSize: 19}}>HIGHSCORE: {Math.max(4, score)}</Text>
                        <Animatable.Text animation = 'rubberBand' style = {{color: '#264653', fontSize: 19}}>SCORE: {score}</Animatable.Text>
                    </View>
                </View>
                <View style = {{alignItems: 'center'}}>
                    {renderTimer}
                </View>
            </View>
            <View>
              {renderModal()}
            </View>
            <View style = {{flex: 0.5, marginTop: 20}}>
                {
                arr.map(comp => {
                    return <Card key = {comp.num}
                                 num = {comp.num}
                                 marginLeft = {comp.marginLeft}
                                 handleCardStyle = {handleCardStyle(comp.clicked)}
                                 handleTextStyle = {handleTextStyle(comp.clicked)} 
                                 clickCard = {() => clickCard(comp.id)}
                                 />
                }) 
                }
            </View>

        </SafeAreaView>
      </>
    );
  };


const styles = StyleSheet.create({

    })

export default GameScreen