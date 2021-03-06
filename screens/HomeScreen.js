import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import StyledButton from '../components/StyledButton';
import Colors from '../constants/colors';

const HomeScreen = props => {
    const onWatchSectorsClick = () => {
        props.navigation.navigate('WatchSectors');
    };

    const onMeasureTimeClick = () => {
        props.navigation.navigate('MeasureTime');
    };

    const onSectorsDataClick = () => {
        props.navigation.navigate('SectorsData');
    };

    const onMeasureDataClick = () => {
        props.navigation.navigate('MeasureData');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.subtitle}>React Native</Text>
                    <Text style={styles.title}>Parking Site</Text>
                </View>
                <View style={styles.grid}>
                    <View style={styles.gridRow}>
                        <StyledButton 
                            style={styles.button} 
                            title="Watch Sectors"
                            icon="th-large"
                            iconSize={72} 
                            onPress={onWatchSectorsClick} />
                        <StyledButton 
                            style={styles.button} 
                            title="Measure Queue Times" 
                            icon="stopwatch"
                            iconSize={72}
                            onPress={onMeasureTimeClick} />
                    </View>
                    <View style={styles.gridRow}>
                        <StyledButton 
                            style={styles.button} 
                            title="Sectors Data" 
                            icon="th-list"
                            iconSize={72}
                            onPress={onSectorsDataClick} />
                        <StyledButton 
                            style={styles.button} 
                            title="Queue Times Data" 
                            icon="th-list"
                            iconSize={72}
                            onPress={onMeasureDataClick} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    subtitle: {
        fontSize: 44,
        fontWeight: 'bold',
        lineHeight: 44,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: Colors.primary
    },

    title: {
        fontSize: 72,
        lineHeight: 72,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: Colors.primaryDark
    },

    grid: {
        width: '100%',
    },

    gridRow: {
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-around',
    },

    button: {
        width: 150,
        height: 150,
        borderRadius: 10
    }
});

export default HomeScreen;
