import {AsyncStorage} from 'react-native'

class LocalStorage{
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('name', 'John');
        } catch (error) {
            // Error saving data
        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                // Our data is fetched successfully
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }

}