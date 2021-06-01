import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

import ActionBar from '../components/ActionBar';
import StyledButton from '../components/StyledButton';

const MeasureTime = props => {
    const [queueCars, setQueueCars] = useState([]);
    const [lastDuration, setLastDuration] = useState(0);

    const onStartClick = () => {
        const now = Date.now();
        const date = new Date(now);
        
        setQueueCars([...queueCars, {
            start: now,
            localeDate: date.toLocaleDateString(),
            localeTime: date.toLocaleTimeString()
        }]);
    }

    const onStopClick = () => {
        const now = Date.now();
        const first = queueCars[0];

        if (first) {
            const duration = ((now - first.start) / 1000).toFixed(2);
            const dateTime = `${first.localeDate} ${first.localeTime}`;
            const remainingQueue = queueCars.slice(1);
            
            setLastDuration(duration);
            setQueueCars([...remainingQueue]);
        }
    }

    return (
        <View style={styles.container}>
            <ActionBar navigation={props.navigation} />
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionTitle}>Cars Departure</Text>
                    </View>
                    <View style={styles.buttonsRow}>
                        <StyledButton 
                            style={styles.button} 
                            title="Turning Away" />
                        <StyledButton 
                            style={styles.button}
                            title="Leaving" />
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionTitle}>Measure Queue Time</Text>
                    </View>
                    <View style={styles.buttonsRow}>
                        <StyledButton 
                            style={styles.button} 
                            title="Start" 
                            onPress={onStartClick} />
                        <StyledButton 
                            style={styles.button}
                            title="Stop"
                            onPress={onStopClick} />
                    </View>
                </View>
                <Text style={styles.lastDuration}>Last waiting time: {lastDuration} seconds.</Text>
                <View style={styles.section}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionTitle}>Cars Queue</Text>
                    </View>
                    <View>
                        {queueCars.map((car, index) => {
                            console.log(car, index);
                            return (
                                <View key={index} style={styles.queueItem}>
                                    <Text>{car.localeDate} {car.localeTime}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
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

    section: {
        marginTop: 30,
        paddingHorizontal: 30
    },

    sectionRow: {
        flexDirection: 'row',
    },

    sectionTitle: {
        fontSize: 24
    },

    buttonsRow: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        justifyContent: 'space-around'
    },

    button: {
        width: 100,
        height: 100,
        borderRadius: 15
    },

    lastDuration: {
        marginTop: 20,
        textAlign: 'center',
        color: 'grey'
    },

    queueItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 15,
    }
});

export default MeasureTime;