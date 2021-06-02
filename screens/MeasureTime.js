import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {FontAwesome5} from '@expo/vector-icons';

import LocalDB from '../utils/LocalDB';
import ActionBar from '../components/ActionBar';
import StyledButton from '../components/StyledButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const MeasureTime = props => {
    const [queueCars, setQueueCars] = useState([]);
    const [lastDuration, setLastDuration] = useState(0);

    const onDepartureClick = (type) => {
        const date = new Date(Date.now());

        LocalDB.insertRecord('departures', ['type', 'created_at'], {
            type: type,
            created_at: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        }).then(rs => {
            const messageType = rs.insertId > 0 ? 'success' : 'danger';
            const message = rs.insertId > 0 ? `Record with ${type.replace('-', ' ')} car successfully saved.` : 'There is problem with saving record';

            showMessage({message: message, type: messageType});
        });
    };

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
            
            LocalDB.insertRecord('queue_times', ['duration', 'created_at'], {
                duration: duration,
                created_at: dateTime
            }).then(rs => {
                let messageType = 'danger';
                let message = 'There is a problem with saving record.';

                if (rs.insertId > 0) {
                    messageType = 'success';
                    message = 'Record with waited car in the queue successfully saved.';

                    setLastDuration(duration);
                    setQueueCars([...remainingQueue]);
                    showMessage({ message: message, type: messageType });
                }
            })
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
                            title="Turning Away"
                            icon="redo"
                            iconSize={32}
                            onPress={onDepartureClick.bind(this, 'turning-away')} />
                        <StyledButton 
                            style={styles.button}
                            title="Leaving"
                            icon="arrow-left"
                            iconSize={32}
                            onPress={onDepartureClick.bind(this, 'leaving')} />
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionTitle}>Measure Queue Time</Text>
                    </View>
                    <View style={styles.buttonsRow}>
                        <StyledButton 
                            style={styles.button} 
                            icon="play"
                            iconSize={32}
                            onPress={onStartClick} />
                        <StyledButton 
                            style={styles.button}
                            icon="stop"
                            iconSize={32}
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
                            return (
                                <View key={index} style={styles.queueItem}>
                                    <FontAwesome5 name="car" size={20} color={Colors.primary} />
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
        width: 110,
        height: 110,
        borderRadius: 15
    },

    lastDuration: {
        marginTop: 20,
        textAlign: 'center',
        color: 'grey'
    },

    queueItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
    }
});

export default MeasureTime;