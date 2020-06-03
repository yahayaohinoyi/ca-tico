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
// const obj = require('../Rules/rule')
import Stack from '../Rules/rule'
let obj = new Stack()
import GenerateRandom from '../Rules/fisherYates'
import * as Animatable from 'react-native-animatable';

const GameScreen = (props) => {
    var fisher = new GenerateRandom()
    var out = fisher.output(6)
    fisher.mapOut(out)


    const [gameState, setGameState] = useState(false)
    const [score, setScore] = useState(0)
    const [counter, setCounter] = useState(0)
    const [arr, setArr] = useState(fisher.outArray)

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
        if (counter === arr.length - 2){
            fisher = createNewRandomInstance

        }
        if (counter === arr.length - 1){
            if(gameState && obj.getArr()[obj.getArr().length - 2] < obj.peek() ){
                setArr(fisher.outArray)
                setScore(score + 1)
                // var obj = createNewStackInstance
            }
            else{
                alert('Lmfao idiot, you cant beat it!!!!')
            }
        }
        
    }
    const createNewRandomInstance = () => {
        var fisher = new GenerateRandom()
        var out = fisher.output(6)
        fisher.mapOut(out)
        return fisher
    }

    const createNewStackInstance= () => {
        obj = new Stack()
        return obj
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
                        <Animatable.Text animation = 'rubberBand' style = {{color: '#264653', fontSize: 19}}>SCORE: {score}</Animatable.Text>
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
                                 num = {comp.num} r
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