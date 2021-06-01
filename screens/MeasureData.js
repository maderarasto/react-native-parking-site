import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import ActionBar from '../components/ActionBar';
import StyledButton from '../components/StyledButton';

const MeasureData = props => {
    return (
        <View style={styles.container}>
            <ActionBar navigation={props.navigation} />
            <View style={styles.content}>
                <View style={styles.dataToolbar}>
                    <View style={styles.dataActions}>
                        <StyledButton style={styles.actionButton} title="E" color="green" />
                        <StyledButton style={styles.actionButton} title="V" color="red" />
                    </View>
                </View>
                <View style={{marginTop: 15}}>
                    <View style={styles.dataRow}>
                        <Text>12.09.2020 14:14:39</Text>
                        <Text>7.9 seconds</Text>
                    </View>
                    <View style={styles.dataRow}>
                        <Text>12.09.2020 14:14:39</Text>
                        <Text>12.59 seconds</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },

    content: {
        flex: 1
    },

    dataToolbar: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    dataActions: {
        flexDirection: 'row',
    },

    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginLeft: 5
    },

    dataRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        justifyContent: 'space-between'
    }
});

export default MeasureData;