import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import WatchSectors from './screens/WatchSectors';
import MeasureTime from './screens/MeasureTime';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="WatchSectors" component={WatchSectors} />
                <Stack.Screen name="MeasureTime" component={MeasureTime} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
});
