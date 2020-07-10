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
import LinearGradient from 'react-native-linear-gradient'
// import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar'
import Leaderboard from 'react-native-leaderboard';




import Timer from './timer'
// import Toast from 'react-native-simple-toast';

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
    const dataContext = useContext(FireBaseContext)[0]
    const [failed, setFailed] = useState(false)
    const [multiplayerGameCounter, setMultiplayerGameCounter] = useState(0)
    const [myScore, setMyScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)

    const [toast, setToast] = useState(false)

    useEffect(() => {
        var myData = Object.values(dataContext)
        setData(myData)
    }, [])

    useEffect(() => {
        setHighScore(dataContext[uniqueId]['highScore'])
        // setInstruction(instruction)
    }, [data, instruction])

    useEffect(() => {
        pubnub.subscribe({channels})
        pubnub.addListener({
            message: messageEvent => {
                // console.log(messageEvent.message, host)
                if(host && messageEvent.message.readyToPlay){
                    setIsWating(false)
                    setIsplaying(true)

                }
                else if(client && messageEvent.message.is_room_creator){
                    setIsWating(false)
                    setIsplaying(true)
                }
                else if(messageEvent.message.isPacketData){  
                    setStackObj(new Stack(messageEvent.message.instruction))      
                    setArr(messageEvent.message.packetData)
                    setMultiplayerGameCounter(messageEvent.message.game_number)
                    // setId('abcdefghijklmn'.charCodeAt(multiplayerGameCounter))
                    setId(Math.random().toString(36).substr(2, 5))
                    setInstruction(messageEvent.message.instruction)
                    setResetTimer(10)
                    setToast(true)
                    if(messageEvent.message.isHost && client){
                        setOpponentScore(messageEvent.message.myScore)
                    }
                    else if(!messageEvent.message.isHost && host){
                        setOpponentScore(messageEvent.message.myScore)
                    }

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
                    whoToPlay(1)
                    setScore(score + 1)
                    setCounter(0)
                    setMyScore(myScore + 1)                    
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

        if(multiplayerGameCounter < 14 ){
            if(host && multiplayerGameCounter % 2 == 0 ){
                whoToPlay(0) 
            }
            else if(client && multiplayerGameCounter % 2 !== 0){
                whoToPlay(0)
            }
            setScore(score + 1)
            setCounter(0)

        }
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

    const whoToPlay = (incremental) => {
        let new_instance = createNewRandomInstance().outArray
        let my_instruction = makeInstruction()
        var host_won = false
        if(host){
            host_won = true
        }
        pubnub.publish({
            message: {
                isPacketData: true, 
                packetData: new_instance,
                new_time: 10,
                game_number: multiplayerGameCounter + 1,
                instruction: my_instruction,
                host_won,
                isHost: host,
                myScore: myScore + incremental
            },
            channel: `${gameId}`
            });
    }

 
    
    
    const renderTimer = () => {
        return  <CountDown
                    id = {'abcdefghijklmn'.charCodeAt(multiplayerGameCounter).toString()}
                    // key = {multiplayerGameCounter}
                    until={resetTimer}
                    onFinish={ failed ? {}: () => onFailRound('failed.mp3')
                        // if(!failed){onFailRound('failed.mp3')}
                        
                        }
                    style = {{borderWidth: 2, borderColor: '#5E6472', borderRadius: 40}}
                    size={16}
                    timeToShow={['S']}
                    timeLabels={{m: null, s: null}}
                    digitStyle={{backgroundColor: '#fff'}}
                    digitTxtStyle={{color: '#5E6472'}}
                />
    }



    
    
    
    
    return (
      <>
        <LinearGradient style = {{flex: 1}} colors={['#5E6366', '#4E656E', '#49859A']}>

        {(myScore === 7 || opponentScore === 7 || multiplayerGameCounter === 14) && <SafeAreaView style = {{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <View style = {{marginBottom: 10}}>{(opponentScore > myScore) && <Text style = {{fontFamily: 'Bangers-Regular', fontSize: 40}}>You Lost! {' '}</Text>}
    {(opponentScore < myScore) && <Text style = {{fontFamily: 'Bangers-Regular', fontSize: 40}}>You Won!{' '}</Text>}
    {(opponentScore === myScore) && <Text style = {{fontFamily: 'Bangers-Regular', fontSize: 40}}>It's a Draw!{' '}</Text>}
            </View>
            <View style = {{width: 250}}><Leaderboard 
                    data = {[{userName: 'Me', highScore: myScore},
                    {userName: 'Opponent', highScore: opponentScore}]} 
                    labelStyle = {{fontFamily:'Bangers-Regular'}}
                    // scoreStyle = {{fontFamily:'Bangers-Regular'}}
                    sortBy='highScore' 
                    containerStyle = {{flex: 1, backgroundColor: 'black'}}
                    labelBy='userName'
                    oddRowColor = '#51626A'
                    evenRowColor = '#4E656F'
                        /></View></SafeAreaView>}
        {isPlaying && (myScore < 7 && opponentScore <7 && multiplayerGameCounter < 14) && <SafeAreaView style = {{flex: 1}}>
            <View style = {{flex: 0.3 ,backgroundColor: '#FFF', borderBottomLeftRadius: 200, borderBottomRightRadius: 200}}>
                <View style = {{flex: 0.8, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <View>
                        {<Text>ME</Text>}<ProgressBar color = '#49859A' progress={myScore/7} width={300} />
                    </View>
                    <View style = {{paddingTop: 30}}>
                        {<Text>OPPONENT</Text>}<ProgressBar color = '#49859A' progress={opponentScore/7} width={300} />
                    </View>

                    {/* <Text>OPPONENT : {opponentScore}</Text>
                    <Progress.Bar progress={0.3} width={200} /> */}
                </View>
                <View style = {{alignItems: 'center' , marginBottom: 6}}>
                    {renderTimer()}
                    {}
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

        </SafeAreaView> }
        { isWaiting && !isPlaying && (myScore < 7 && opponentScore <7) &&
            <SafeAreaView style = {{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Circle />
                <Text style = {{paddingTop: 30}}> Waiting for opponent...</Text>
            </SafeAreaView>
          
        }
        {!isPlaying && (myScore < 7 && opponentScore <7) && <SafeAreaView style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity 
                style = {{height: 40, width: 300, borderWidth: 1,borderRadius: 30, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 5}}
                onPress = {onPressCreateRoom}>
                <Text style = {{fontFamily:'Bangers-Regular', fontSize: 20}}>HOST{' '}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {{height: 40, width: 300, borderWidth: 1,borderRadius: 30, borderColor: '#fff', alignItems: 'center', justifyContent: 'center'}}
                onPress = {onPressJoinRoom}>
                <Text style = {{fontFamily:'Bangers-Regular', fontSize: 20}}>JOIN{' '}</Text>
            </TouchableOpacity>
        </SafeAreaView>}
        </LinearGradient>
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