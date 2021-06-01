import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import colors from './../constants/colors';

import Colors from './../constants/colors';
import StyledButton from './StyledButton';

const ButtonGroup = props => {
    const [activeButton, setActiveButton] = useState(0);

    const onButtonPress = (button, buttonIndex) => {
        setActiveButton(buttonIndex);
        
        if (props.onPress)
            props.onPress({button: button, buttonIndex: buttonIndex});
    };

    const resolveButtonStyle = (buttonIndex) => {
        const style = buttonIndex !== 0 ? buttonIndex !== props.buttons.length - 1 ? 
            styles.button : styles.lastButton : styles.firstButton;
        return activeButton === buttonIndex ? {...style, ...styles.activeButton} : {...style};
    };

    return (
        <View style={styles.buttons}>

            {props.buttons.map((button, index) => {
                return (
                    <StyledButton
                        key={button}
                        style={resolveButtonStyle(index)} 
                        title={button}
                        onPress={onButtonPress.bind(this, button, index)} />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row'
    },

    button: {
        minWidth: 40,
        borderRadius: 0
    },

    firstButton: {
        minWidth: 40,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },

    lastButton: {
        minWidth: 40,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

    activeButton: {
        backgroundColor: colors.primaryDark
    }
});

export default ButtonGroup;