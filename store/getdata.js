import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity
  } from 'react-native';

  import {useState, useEffect} from 'react'
  import firebase from 'firebase'

const FireBaseContext = React.createContext({})

const Store = ({children}) => {
    const [data, setData] = useState([])
        useEffect(() => {
            const firebaseConfig = {
            apiKey: "AIzaSyApb-7v_tDdCY3unQZgIIaFRizBPlLPwFU",
            authDomain: "caotico-b8650.firebaseapp.com",
            databaseURL: "https://caotico-b8650.firebaseio.com",
            projectId: "caotico-b8650",
            storageBucket: "caotico-b8650.appspot.com",
            messagingSenderId: "785688806738",
            appId: "1:785688806738:web:a322a8ce85ae3f9e49a68b",
            measurementId: "G-3MTKKNNEWJ"
            };
            if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            }else{
            firebase.app()
            }
            firebase.database().ref('users').limitToFirst(20).on('value', (out)=>{           
            out = out.toJSON()
            // console.log(out)
            setData(out)
           
            })
      }, [])
    return (
        <>
        <FireBaseContext.Provider value = {{data}}>
            {children}
        </FireBaseContext.Provider>
        </>
    )
}

export {Store, FireBaseContext}
