import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Text, Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {FontAwesome5} from '@expo/vector-icons';

import LocalDB from '../utils/LocalDB';
import File from '../utils/File';
import Colors from '../constants/colors';

import ActionBar from '../components/ActionBar';
import StyledButton from '../components/StyledButton';

const MeasureData = props => {
    const [queueTimesData, setQueueTimesData] = useState([]);

    useEffect(() => {
        LocalDB.selectRecords('queue_times', ['duration', 'created_at'])
            .then(rs => {
                const queueTimes = rs.rows._array.map(item => ({
                    duration: item.duration,
                    created_at: item.created_at
                }));
                setQueueTimesData(queueTimes);
            });
    }, []);

    const onExportButtonPress = () => {
        LocalDB.selectRecords('queue_times', ['duration', 'created_at'])
            .then(rs => {
                const file = new File('export_queue_times.csv');
                
                rs.rows._array.forEach(item => file.putLine(`${item.duration};${item.created_at}`));
                file.flush().then(() => {
                    showMessage({ message: 'Queue times data successfully exported.', type: 'success' });
                });
            });
    }

    const onClearButtonPress = () => {
        Alert.alert('Clear data', 'Are you sure you want to clear data?', [
            { text: 'cancel', onPress: () => {}, style: 'cancel' },
            { text: 'clear', onPress: () => {
                LocalDB.deleteRecords('queue_times')
                    .then(_ => {
                        setQueueTimesData([]);
                        showMessage({ message: 'Queue times data successfully cleared.', type: 'success'});
                    });
            }, style: 'destructive' },
        ], { cancelable: true });
    }

    const defaultMessage = (
        <View style={styles.defaultContainer}>
            <Text style={styles.defaultMessage}>No queue times data found.</Text>
        </View>
    );

    const renderItem = ({item}) => (
        <View style={styles.dataRow}>
            <Text>{item.created_at}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '30%'}}>
                <FontAwesome5 name="stopwatch" size={20} color={Colors.primary} />
                <Text>{item.duration} seconds</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ActionBar navigation={props.navigation} />
            <View style={styles.content}>
                <View style={styles.dataToolbar}>
                    <View style={styles.dataActions}>
                        <StyledButton 
                            style={styles.actionButton} 
                            icon="file-excel"
                            iconSize={20}
                            color="green" 
                            onPress={onExportButtonPress} />
                        <StyledButton 
                            style={styles.actionButton} 
                            icon="trash"
                            iconSize={20}
                            color="red" 
                            onPress={onClearButtonPress} />
                    </View>
                </View>
                <FlatList
                    data={queueTimesData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()} 
                    contentContainerStyle={{flexGrow: 1, marginTop: 15}}
                    ListEmptyComponent={defaultMessage} />
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
    },

    defaultContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    defaultMessage: {
        color: 'grey'
    }
});

export default MeasureData;