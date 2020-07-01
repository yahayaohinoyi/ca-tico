import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';

import firebase from 'firebase'
import DeviceInfo from 'react-native-device-info';
import prompt from 'react-native-prompt-android';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
let uniqueId = DeviceInfo.getUniqueId();
import {FireBaseContext} from '../store/getdata'

import { usePubNub } from 'pubnub-react'; 
import shortid  from 'shortid';
import { Circle } from 'react-native-animated-spinkit'

import { v4 as uuidv4 } from 'uuid';
import CountDown from 'react-native-countdown-component';

import Card from '../components/card'
import {useState, useEffect, useContext} from 'react'
import Stack from '../Rules/rule'
import GenerateRandom from '../Rules/fisherYates'
import * as Animatable from 'react-native-animatable';
import Instruction from '../screens/instruction';

const channels = ['gameLobby'];

const MultiplayerGameScreen = (props) => {
    var fisher = new GenerateRandom()
    var out = fisher.output(3)
    fisher.mapOut(out)

    const pubnub = usePubNub()
    const [host, setHost] = useState(false)
    const [client, setClient] = useState(false)
    const [isWaiting, setIsWating] = useState(false)
    const [isPlaying, setIsplaying] = useState(false)
    const [gameId, setGameId] = useState('')


    const [probVal, setProbVal] = useState(8)
    const [difficulty, setDifficulty] = useState(3)
    const [instruction, setInstruction] = useState('ASCEND')
    const [whoosh, setWoosh] = useState(whoosh)
    const [id, setId] = useState(Math.floor(Math.random() * (100000 - 0)) + 0)
    const [stackObj, setStackObj] = useState(new Stack('ASCEND'))
    const [score, setScore] = useState(0)
    const [counter, setCounter] = useState(0)
    const [arr, setArr] = useState(fisher.outArray)
    const [resetTimer, setResetTimer] = useState(10)

    const [data, setData] = useState([])
    const [highScore, setHighScore] = useState(0)
    const dataContext = useContext(FireBaseContext).data
    const [failed, setFailed] = useState(false)
    const [multiplayerGameCounter, setMultiplayerGameCounter] = useState(0)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)

    useEffect(() => {
        var myData = Object.values(dataContext)
        setData(myData)
    }, [])

    useEffect(() => {
        setHighScore(dataContext[uniqueId]['highScore'])
        setInstruction(instruction)
    }, [data, instruction])

    useEffect(() => {
        pubnub.subscribe({channels})
        pubnub.addListener({
            message: messageEvent => {
                console.log(messageEvent.message, host)
                if(host && messageEvent.message.readyToPlay){
                    setIsWating(false)
                    setIsplaying(true)

                }
                else if(client && messageEvent.message.is_room_creator){
                    setIsWating(false)
                    setIsplaying(true)
                }
                else if(messageEvent.message.isPacketData){
                    setResetTimer(10)
                    setArr(messageEvent.message.packetData)
                    
                }

            }
        })
    }, [pubnub, host, client])



    

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
                    whoToPlay()
                    // else{
                    //     setArr(createNewRandomInstance().outArray)
                    // }
                    setScore(score + 1)
                    setCounter(0)
                    let my_instruction = makeInstruction()
                    setStackObj(new Stack(my_instruction))
                    setResetTimer(10)
                    setId(Math.floor(Math.random() * (100000 - 0)) + 0)
                    // console.log(id)
                    setMyScore(myScore + 1)
                    setMultiplayerGameCounter(multiplayerGameCounter + 1)
                    
                    soundEffect('test1.mp3')
                }

            }
            else{
                // whoosh.stop(()=>{})
                // onFailRound()
            }
        } 
    }

    const makeInstruction = () => {
        if (score % 3 === 0 && probVal < 70){
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
            fontWeight: '600'
        }
        }

    const updateHighScore = () => {
        return Math.max(score, highScore)
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
        // if(score > highScore){
        //     setHighScore(score)
        //     const firebaseConfig = {
        //         apiKey: "AIzaSyApb-7v_tDdCY3unQZgIIaFRizBPlLPwFU",
        //         authDomain: "caotico-b8650.firebaseapp.com",
        //         databaseURL: "https://caotico-b8650.firebaseio.com",
        //         projectId: "caotico-b8650",
        //         storageBucket: "caotico-b8650.appspot.com",
        //         messagingSenderId: "785688806738",
        //         appId: "1:785688806738:web:a322a8ce85ae3f9e49a68b",
        //         measurementId: "G-3MTKKNNEWJ"
        //     };
        //     if (!firebase.apps.length) {
        //         firebase.initializeApp(firebaseConfig);
        //     }else{
        //         firebase.app()
        //     }
            
        //     firebase.database().ref(`users/${uniqueId}`).update({
        //         highScore: score
        //     })
        //     }
            // setFailed(true)
        if(multiplayerGameCounter < 14 && myScore < 7 && opponentScore < 7){
            setMultiplayerGameCounter(multiplayerGameCounter + 1)
            if(host && multiplayerGameCounter % 2 == 0 ){
                whoToPlay() 
            }
            else if(client && multiplayerGameCounter % 2 !== 0){
                whoToPlay()
            }
                 
            setResetTimer(10)        
            setScore(score + 1)
            setCounter(0)
            let my_instruction = makeInstruction()
            setStackObj(new Stack(my_instruction))
            setId(Math.floor(Math.random() * (100000 - 0)) + 0)
        }
        // soundEffect(aud)
        // setScore(0)
        // props.handleCompleteTime()

    }
    const onPressCreateRoom = () => {
        let roomId = shortid.generate() 
        let shorterRoomId = roomId.substring(0,5);
        roomId = shorterRoomId;
        setGameId(roomId)
        pubnub.subscribe({
            channels: [roomId],
            withPresence: true
        });
        Alert.alert(
            'Share this room ID with your friend',
            roomId,
            [
              {text: 'Done'},
            ],
            { cancelable: false }
          );
          pubnub.publish({
            message: {
              is_room_creator: true,
            //   username: this.state.username
            },
            channel: `${roomId}`
          });
          setHost(true)
          setIsWating(true)
    }

    const onPressJoinRoom = () => {
        if(Platform.OS == "android"){
            prompt(
                'Enter the room name',
                '',
                [
                 {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                 {text: 'OK', onPress: (value) =>  
                 (value === '') ? '' : joinRoom(value)},
                ],
                {
                    type: 'default',
                    cancelable: false,
                    defaultValue: '',
                    placeholder: ''
                  }
              );              

        }
        else{
            Alert.prompt(
                'Enter the room name',
                '',
                [
                 {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                 {text: 'OK', onPress: (value) =>  
                 (value === '') ? '' : joinRoom(value)},
                ],
                'plain-text',
              );
        }

    }

    const joinRoom = (id) => {
        setGameId(id)
        pubnub.hereNow({
            channels: [`${id}`]
        }, (status, response) => {
            if(response.totalOccupancy < 1){
                Alert.alert('Lobby is empty','Please create a room or wait for someone to create a room to join.');
            }
            else if(response.totalOccupancy < 3){
                pubnub.subscribe({
                  channels: [`${id}`],
                  withPresence: true
                });
                pubnub.publish({
                    message: {
                      readyToPlay: true, // Game can now start
                      not_room_creator: true,
                    //   username: this.state.username
                    },
                    channel: `${id}`
                  });
            
            }
            else{
                Alert.alert('Room full','Please enter another room name');
              }
          
        })
        setClient(true)
        setIsWating(true)
    }

    const whoToPlay = () => {
        let new_instance = createNewRandomInstance().outArray
        pubnub.publish({
            message: {
                isPacketData: true, 
                packetData: new_instance
            },
            channel: `${gameId}`
            });
        setArr(new_instance)
        setResetTimer(10)
            

    }

 
    
    
    const renderTimer =
                <CountDown
                    id = {id.toString()}
                    until={resetTimer}
                    onFinish={() => failed ? {} : onFailRound('failed.mp3')
                        // if(!failed){onFailRound('failed.mp3')}
                         
                        }
                    // onPress={() => alert('hello')}
                    size={16}
                    timeToShow={['S']}
                    digitStyle={{backgroundColor: '#5E6472'}}
                    digitTxtStyle={{color: '#fff'}}
                />
    

    
    
    
    
    return (
      <>
        {isPlaying && <SafeAreaView style = {{flex: 1, backgroundColor: '#5E6472'}}>
            <View style = {{flex: 0.3 ,backgroundColor: '#FFF', borderBottomLeftRadius: 200, borderBottomRightRadius: 200}}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
                    <View style = {{alignItems: 'center'}}> 
                        <Text>Player 1</Text>
                        <Text>8</Text>
                    </View>
                    <View style = {{alignItems: 'center'}}>
                        <Text>player 2</Text>
                        <Text>9</Text>
                    </View>
                </View>
                <View style = {{alignItems: 'center' , marginBottom: 6}}>
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
                <Animatable.Text key = {score + 1} animation = 'flash' style = {{color: '#fff', fontSize: 30, fontWeight: '800'}}>
                    {instruction}
                </Animatable.Text>
            </Animatable.View>

        </SafeAreaView>}

        { isWaiting && !isPlaying &&
            <SafeAreaView style = {{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#5E6472'}}>
                <Circle />
            </SafeAreaView>
            
        }
        {!isPlaying && <SafeAreaView style = {{flex: 1, backgroundColor: '#5E6472', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity 
                style = {{height: 40, width: 120, borderWidth: 1, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 5}}
                onPress = {onPressCreateRoom}>
                <Text>HOST</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {{height: 40, width: 120, borderWidth: 1, borderColor: '#fff', alignItems: 'center', justifyContent: 'center'}}
                onPress = {onPressJoinRoom}>
                <Text>JOIN</Text>
            </TouchableOpacity>


            
            

        </SafeAreaView>}
      </>
    );
  };


const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 50
      },
    })

export default MultiplayerGameScreen