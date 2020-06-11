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
import {useState, useEffect} from 'react'
// const obj = require('../Rules/rule')
import Stack from '../Rules/rule'
import GenerateRandom from '../Rules/fisherYates'
import * as Animatable from 'react-native-animatable';

const GameScreen = (props) => {
    var fisher = new GenerateRandom()
    var out = fisher.output(6)
    fisher.mapOut(out)

    const [whoosh, setWoosh] = useState(whoosh)
    const [id, setId] = useState(Math.floor(Math.random() * (100000 - 0)) + 0)
    const [stackObj, setStackObj] = useState(new Stack())
    const [score, setScore] = useState(0)
    const [counter, setCounter] = useState(0)
    const [arr, setArr] = useState(fisher.outArray)
    const [resetTimer, setResetTimer] = useState(10)

    let _map = new Map()

    for(let i = 0; i < arr.length; i ++){
        _map[arr[i].id] = arr[i]
    }

    // useEffect(() => {
    //     async function fetchFisher(){
    //         const myArr = await fisher.outArray
    //         console.log(myArr)
    //         setArr(myArr)
    //     }
    //         if (counter == 0 ||  counter == 6){
    //         fetchFisher()
    //         }

    // }, [])



    const clickCard = id => {
        // console.log(_map[id])
        if(!_map[id].clicked){
            setCounter(counter + 1)
            stackObj.push(_map[id].num)    
            soundEffect('bubble_1.mp3')
        }
        else{
            setCounter(counter - 1)
            stackObj.pop()
            soundEffect('unbubble.mp3')
        }
        _map[id].clicked = !_map[id].clicked
        setArr(   
            Object.values(_map)
        )
        if(counter == arr.length - 1){
            if(stackObj.validate()){
                if(stackObj.getArr().length === arr.length){
                    console.log('na me cause am')
                    setArr(createNewRandomInstance().outArray)
                    setScore(score + 1)
                    setCounter(0)
                    setStackObj(new Stack())
                    setResetTimer(10)
                    setId(Math.floor(Math.random() * (100000 - 0)) + 0)
                    // console.log(id)
                    soundEffect('test1.mp3')
                }

            }
            else{
                onFailRound('failed.mp3')
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

    const soundEffect = (filename) => {
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


    const onFailRound = (aud) => {
        soundEffect(aud)
        setScore(0)
        props.handleCompleteTime()

    }

 
    
    
    const renderTimer =
                <CountDown
                    id = {id.toString()}
                    until={resetTimer}
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
                    <Text style = {{fontWeight: '900', fontSize: 20}}>{}</Text>
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