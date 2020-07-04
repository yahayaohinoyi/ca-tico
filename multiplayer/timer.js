import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform, 
    PanResponder,
    PanResponderInstance, 
    Easing
  } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default class  timer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            renderTimeValue : 100000,
            count: 1,
            key: 1
        }
        this.onTimerComPlete = this.onTimerComPlete.bind(this)
        

    }
    onTimerComPlete(){
        if(this.state.count <5){
            console.log(this.state.count, 'hey', this.state.renderTimeValue)
            this.setState({
                count: this.state.count + 1,
                renderTimeValue: 10, 
                key: this.state.key + 1
            })
        }
 
    }
    componentDidUpdate(){
        this.circularProgress.animate(100, 9000, Easing.quad)
    }
    
    render(){
        
        return (
            <View>
                <AnimatedCircularProgress        
                    size={40}
                    width={4}
                    fill={this.state.renderTimeValue}
                    tintColor= "#3d5875"
                    ref={(ref) => this.circularProgress = ref}
                    onAnimationComplete={this.onTimerComPlete()}
                    backgroundColor= "#00e0ff" >
                        {
                            (fill) => (
                                
                            <Text>
                                { parseInt((100 - fill) / 10) }
                            </Text>
                            )
                        }
                </AnimatedCircularProgress>


            </View>

        )
    }

}
