import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

import Colors from '../constants/colors';

const StyledButton = props => {
    const onPressHandler = props.onPress ? props.onPress : () => {};
    const colorStyle = { backgroundColor: props.color ? props.color : Colors.primary };

    return (
        <TouchableNativeFeedback onPress={onPressHandler}>
            <View style={{...styles.button, ...props.style, ...colorStyle}}>
                <Text style={{...styles.buttonText}}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white'
    }
});

export default StyledButton;
