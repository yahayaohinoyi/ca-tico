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
import Card from '../components/card'
import {useState} from 'react'
const obj = require('../Rules/rule')


const GameScreen = (props) => {

    const [gameState, setGameState] = useState(false)
    const [score, setScore] = useState(0)
    const [counter, setCounter] = useState(0)
    const [arr, setArr] = useState([
        {
            num : 7,
            clicked : false,
            id: 7,
            marginLeft: 70
        },
        {
            num : 2,
            clicked : false,
            id: 2,
            marginLeft: 200
        },
        {
            num : 3,
            clicked : false,
            id: 3,
            marginLeft: 250
        },
        {
            num : 6,
            clicked : false,
            id: 6,
            marginLeft: 100
        },
        {
            num : 1,
            clicked : false,
            id: 1,
            marginLeft: 300
        },
        {
            num : 4,
            clicked : false,
            id: 4,
            marginLeft: 150
        }

    ])

    const clickCard = (id) => {
        setArr(
            arr.map(item => {
                if(item.id === id){
                    if(!item.clicked){
                        setCounter(counter + 1)
                        obj.push(item.num)
                        let my_obj = obj.getEvery()
                        setGameState(my_obj[obj.length() - 1])
                    }
                    else{
                        setCounter(counter - 1)
                        obj.pop()
                        let my_obj = obj.getEvery()
                        setGameState(my_obj[obj.length() - 1])
                    }
                    item.clicked = !item.clicked
                }

                return item
            })
        )
        if (counter === 5){
            if(gameState && obj.getArr()[obj.getArr().length - 2] < obj.peek() ){
                setScore(score + 1)
                alert('yaaay you won the round!!!')
            }
            else{
                alert('Lmfao idiot, you cant beat it!!!!')
            }
        }
        
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
    
    
    
    return (
      <>
        <View style = {{flex: 1, backgroundColor: '#264653'}}>
            <View style = {{flex: 0.3, backgroundColor: '#FFF', borderBottomLeftRadius: 1000, borderBottomRightRadius: 1000}}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 60}}>
                    <View style = {{marginLeft: 15, marginTop: 10 }}>
                        <Text style = {{fontWeight: '900', fontSize: 20}}>caótico</Text>
                    </View>
                    <View style = {{marginRight: 15, marginTop: 40}}>
                        <Text style = {{color: '#264653', fontSize: 19}}>HIGHSCORE: 12</Text>
                        <Text style = {{color: '#264653', fontSize: 19}}>SCORE: {score}</Text>
                    </View>
                </View>
                <View style = {{alignItems: 'center'}}>
                    <Text style = {{color: '#171727', fontSize: 30}}> 6 </Text>
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
        </View>
      </>
    );
  };


const styles = StyleSheet.create({

    })

  export default GameScreen