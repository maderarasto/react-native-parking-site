import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

import Colors from '../constants/colors';

const StyledButton = props => {
    const onPressHandler = props.onPress ? props.onPress : () => {};
    
    const resolveBackground = () => {
        const color = props.color ? props.color : Colors.primary;

        return props.disabled ? 'lightgrey' : color;
    }

    const colorStyle = { backgroundColor: resolveBackground() };
    const textStyle = { fontSize: props.textSize ? props.textSize : 16 };
    
    return (
        <TouchableNativeFeedback onPress={onPressHandler} disabled={props.disabled ? props.disabled : false}>
            <View style={{...styles.button, ...colorStyle, ...props.style}}>
                <Text style={{...styles.buttonText, ...textStyle}}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'white'
    }
});

export default StyledButton;
