import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

const TransparentButton = props => {
    const onPressHandler = props.onPress ? props.onPress : () => {};
    const textStyles = {
        color: props.textColor ? props.textColor : 'black'
    };

    return (
        <TouchableNativeFeedback onPress={onPressHandler}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={{...styles.buttonText, ...textStyles}}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        minWidth: 40,
        minHeight: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    buttonText: {
        textTransform: 'uppercase'
    }
});

export default TransparentButton;