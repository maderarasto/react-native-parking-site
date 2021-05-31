import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import TransparentButton from './TransparentButton';

const ActionBar = props => {
    const onBackButtonPressed = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.actionBar}>
            <TransparentButton style={styles.backButton} title="Back" textColor="white" onPress={onBackButtonPressed} />
            <Text style={styles.title}>React Native Parking Site</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    actionBar: {
        height: 90,
        paddingTop: 36,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3A95CB'
    },

    backButton: {
    },

    title: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default ActionBar;
