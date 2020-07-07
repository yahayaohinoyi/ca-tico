import {AsyncStorage} from 'react-native'
import DeviceInfo from 'react-native-device-info';
let uniqueId = DeviceInfo.getUniqueId();
import firebase from 'firebase'



class LocalStorage{

    _storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
        }
    }

    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // Our data is fetched successfully
                console.log(value);
                return value
            }
        } catch (error) {
            // Error retrieving data
            return ''
        }
    }
    _pushToDataBase = async (highScore, score) => {
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
        
        firebase.database().ref(`users/${uniqueId}`).update({
            highScore: score
        })
        this._storeData(highScore, score)
    }
    

}
export default LocalStorage