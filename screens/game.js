import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform
} from 'react-native';

import firebase from 'firebase'
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
let uniqueId = DeviceInfo.getUniqueId();
import {FireBaseContext} from '../store/getdata'

import { v4 as uuidv4 } from 'uuid';
import CountDown from 'react-native-countdown-component';

import Card from '../components/card'
import {useState, useEffect, useContext} from 'react'
import Stack from '../Rules/rule'
import GenerateRandom from '../Rules/fisherYates'
import * as Animatable from 'react-native-animatable';
import Instruction from './instruction';
import LinearGradient from 'react-native-linear-gradient'
import LocalStorage from '../localStorage/localStorage'

const GameScreen = (props) => {
    var fisher = new GenerateRandom()
    var out = fisher.output(3)
    fisher.mapOut(out)

    const [probVal, setProbVal] = useState(8)
    const [difficulty, setDifficulty] = useState(3)
    const [instruction, setInstruction] = useState('ASCEND')
    // const [whoosh, setWoosh] = useState(whoosh)
    const [id, setId] = useState(Math.floor(Math.random() * (100000 - 0)) + 0)
    const [stackObj, setStackObj] = useState(new Stack('ASCEND'))
    const [score, setScore] = useState(0)
    const [counter, setCounter] = useState(0)
    const [arr, setArr] = useState(fisher.outArray)
    const [resetTimer, setResetTimer] = useState(10)

    const [data, setData] = useState([])
    const [highScore, setHighScore] = useState(0)
    const [dataContext, setDataContext] = useContext(FireBaseContext)
    const [failed, setFailed] = useState(false)
    let localHighScore = new LocalStorage()
    useEffect(() => {
        // var myData = Object.values(dataContext)
        // setData(myData)
        
        const getData = async (id) => {
            try{
                var myLocalHighName = await localHighScore._retrieveData('name')
                if(typeof(myLocalHighName) == 'string' && myLocalHighName.length > 0){
                    var myLocalHighScore = await localHighScore._retrieveData('highScore', 'morethanone')
                }
                else{
                    var myLocalHighScore = await localHighScore._retrieveData('highScore')
                }
                if(typeof(myLocalHighScore) == 'number' || typeof(myLocalHighScore) == 'string'){
                    var val = parseInt(myLocalHighScore)
                    setHighScore(val)

                }
                else{
                    setHighScore(dataContext[uniqueId]['highScore'])
                    await localHighScore._storeData('highScore', dataContext[uniqueId]['highScore'])
                }
    
            }catch(err){
                setHighScore(0)
            }

        }
        getData()

    }, [localHighScore])

    useEffect(() => {
        // setHighScore(dataContext[uniqueId]['highScore'])
        setInstruction(instruction)
    }, [data, instruction])

    


    let _map = new Map()
    for(let i = 0; i < arr.length; i ++){
        _map[arr[i].id] = i
    }
    const clickCard = id => {
        if(!arr[_map[id]].clicked){
            setCounter(counter + 1)
            stackObj.push(arr[_map[id]].num)    
            soundEffect('bubble_1.mp3')
        }
        else{
            setCounter(counter - 1)
            stackObj.pop()
            soundEffect('unbubble.mp3')
        }
        arr[_map[id]].clicked = !arr[_map[id]].clicked
        setArr([...arr])
        if(counter == arr.length - 1){
            if(stackObj.validate()){
                if(stackObj.getArr().length === arr.length){
                    setArr(createNewRandomInstance().outArray)
                    setScore(score + 1)
                    setCounter(0)
                    let my_instruction = makeInstruction()
                    setStackObj(new Stack(my_instruction))
                    setResetTimer(10)
                    setId(Math.floor(Math.random() * (100000 - 0)) + 0)
                    
                    soundEffect('test1.mp3')
                }

            }
            else{
                // whoosh.stop(()=>{})
                onFailRound('failed.mp3')
            }
        } 
    }

    const makeInstruction = () => {
        if (score % 10 === 0 && probVal < 70){
            setProbVal(probVal + 15)
        }
        var rand = Math.floor(Math.random() * (100 - 0)) + 0
        if(rand < probVal){
            setInstruction('DESCEND')
            return 'DESCEND'
            
        }
        else{
            setInstruction('ASCEND')
            return 'ASCEND'
        }
    }

    const createNewRandomInstance = () => {
        var fisher = new GenerateRandom(difficulty)
        if(score % 4 == 0 && difficulty < 6){
            setDifficulty(difficulty + 1)
        }
        var out = fisher.output(difficulty)
        fisher.mapOut(out)
        return fisher
    }
    
    const handleCardStyle = (clicked) => {
        if (!clicked) {
            return {
                height: 70,
                width: 70,
                borderRadius: 400,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }
        }
        return {
            height: 70,
            width: 70,
            borderRadius: 400,
            backgroundColor: '#171727',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
    const handleTextStyle =(clicked) => {
        if (!clicked) {
            return {
                fontSize: 28,
                color: '#171727',
                fontWeight: '600'
            }
        }
        return {
            fontSize: 28,
            color: '#FFF',
            fontWeight: '600',
        }
        }

    const updateHighScore = () => {
        return Math.max(score, highScore)
    }

    const soundEffect = (filename) => {
        var Sound = require('react-native-sound');
        Sound.setCategory('Playback');
        var dir = ''
        var gameSound = ''
        if(Platform.OS === 'android'){
            dir = filename
            gameSound = Sound.MAIN_BUNDLE
        }
        else{
            dir = "/Users/mac/Documents/CODING-PROJECTS/REACT-NATIVE-PROJECTS/caotica/sounds/" + filename
        }
        var whoosh = new Sound(dir, gameSound, (error) => {           
            if (error) {
            //   console.log('failed to load the sound');
              return;
            }
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
           
            // Play the sound with an onEnd callback
            
            else{
                whoosh.play((success) => {

                    if (success) {
                    //   console.log('successfully finished playing');
                    } else {
                    //   console.log('playback failed due to audio decoding errors');
                    }
                  });
            }
            

          });
          
    }


    const onFailRound = (aud) => {
        if(score > highScore){
            setHighScore(score)
            try{
                localHighScore._storeData('highScore', String(score))
                let clonedObject = {}
                Object.assign(clonedObject, dataContext)
                clonedObject[uniqueId]['highScore'] = score
                setDataContext(clonedObject)
            }catch(err){

            }


            try{
                var nameCheck = localHighScore._retrieveData('name')
                if(typeof(nameCheck) == 'string' && nameCheck.length > 0){

                    localHighScore._pushHighScoreToDataBase(score)
                }
            }catch(err){
                console.log('eror')
            }
            }
            setFailed(true)
            soundEffect(aud)
            // setScore(0)
            props.handleCompleteTime()

    }

 
    
    
    const renderTimer =
                <CountDown
                    id = {id.toString()}
                
                    until={resetTimer}
                    onFinish={ failed ? () => {}: () => onFailRound('failed.mp3')
                        // if(!failed){onFailRound('failed.mp3')}
                        
                        }
                    style = {{borderWidth: 2, borderColor: '#5E6472', borderRadius: 40}}
                    size={16}
                    timeToShow={['S']}
                    timeLabels={{m: null, s: null}}
                    digitStyle={{backgroundColor: '#fff'}}
                    digitTxtStyle={{color: '#5E6472'}}
                />
    

    
    
    
    
    return (
      <>
      
        <LinearGradient colors={['#5E6366', '#4E656E', '#49859A']} style = {{flex: 1, backgroundColor: '#5E6472'}}>
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{flex: 0.3, backgroundColor: '#FFF', borderBottomLeftRadius: 200, borderBottomRightRadius: 200}}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 60}}>
                    <View style = {{marginLeft: 15, marginTop: 10 }}>
                         <Text style = {{fontWeight: '900', fontSize: 20, fontFamily:'Bangers-Regular'}}>caótico {' '}</Text>
                    </View>
                    <View style = {{marginRight: 15, marginTop: 20}}>
                        <Text style = {{color: '#264653', fontSize: 24, fontFamily: 'Bangers-Regular'}}>HIGHSCORE: {updateHighScore() + ' '}</Text>
                        <Animatable.Text key = {score} animation = 'rubberBand' style = {{color: '#264653', fontSize: 20}}>SCORE: {score}</Animatable.Text>
                    </View>
                </View>
                <View style = {{alignItems: 'center', marginBottom: 10}}>
                    {renderTimer}
                </View>
            </View>
            <View style = {{flex: 0.65, marginTop: 20}}>
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
            <Animatable.View animation = 'flash' style = {{flexDirection: 'column-reverse', justifyContent:'flex-end', alignItems: 'center'}}>
                <Animatable.Text key = {score + 1} animation = 'flash' style = {{color: '#fff', fontSize: 50, fontWeight: '800', fontFamily:'Bangers-Regular'}} >
                    {instruction + ' '}
                </Animatable.Text>
            </Animatable.View>
            </SafeAreaView>
        </LinearGradient>
        
      </>
    );
  };


const styles = StyleSheet.create({

    })

export default GameScreen