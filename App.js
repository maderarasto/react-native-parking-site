import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import HomeScreen from './screens/HomeScreen';
import WatchSectors from './screens/WatchSectors';
import MeasureTime from './screens/MeasureTime';
import SectorsData from './screens/SectorsData';
import MeasureData from './screens/MeasureData';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="WatchSectors" component={WatchSectors} />
                <Stack.Screen name="MeasureTime" component={MeasureTime} />
                <Stack.Screen name="SectorsData" component={SectorsData} />
                <Stack.Screen name="MeasureData" component={MeasureData} />
            </Stack.Navigator>
            <FlashMessage position="top"/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
});

export default App;