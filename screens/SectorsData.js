import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Text, Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {FontAwesome5} from '@expo/vector-icons';

import LocalDB from '../utils/LocalDB';
import File from '../utils/File';

import ActionBar from '../components/ActionBar';
import StyledButton from '../components/StyledButton';
import ButtonGroup from '../components/ButtonGroup';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SectorsData = props => {
    const [sectorsData, setSectorsData] = useState([]);

    useEffect(() => {
        LocalDB.selectRecords('sectors', ['sector', 'type', 'created_at'])
            .then(rs => {
                const sectorRecords = rs.rows._array.map(item => ({
                    sector: item.sector,
                    type: item.type,
                    created_at: item.created_at
                }));

                setSectorsData(sectorRecords);
            });
    }, []);

    const onFilterButtonPress = ({button, buttonIndex}) => {
        const sector = button.toLowerCase();
        const whereSql = sector !== 'all' ? 'sector = (?)' : '';
        const parameters = sector !== 'all' ? [sector] : [];

        LocalDB.selectRecords('sectors', ['sector', 'type', 'created_at'], whereSql, parameters)
            .then(rs => {
                const sectorRecords = rs.rows._array.map(item => ({
                    sector: item.sector,
                    type: item.type,
                    created_at: item.created_at
                }));

                setSectorsData(sectorRecords);
            })
    };

    const onExportButtonPress = () => {
        LocalDB.selectRecords('sectors', ['sector', 'type', 'created_at'])
            .then(rs => {
                const file = new File('export_sectors.csv');
                
                rs.rows._array.forEach(item => file.putLine(`${item.sector};${item.type};${item.created_at}`));
                file.flush().then(() => {
                    showMessage({ message: 'Sectors data successfully exported.', type: 'success' });
                });
            });
    }

    const onClearButtonPress = () => {
        Alert.alert('Clear data', 'Are you sure you want to clear data?', [
            { text: 'cancel', onPress: () => {}, style: 'cancel' },
            { text: 'clear', onPress: () => {
                LocalDB.deleteRecords('sectors')
                    .then(_ => {
                        setSectorsData([]);
                        showMessage({ message: 'Sectors data successfully cleared.', type: 'success'});
                    });
            }, style: 'destructive' },
        ], { cancelable: true });
        
    }

    const defaultMessage = (
        <View style={styles.defaultContainer}>
            <Text style={styles.defaultMessage}>No sectors data found.</Text>
        </View>
    );

    const renderItem = ({item}) => (
        <View style={styles.dataRow}>
            <Text>{item.created_at}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '25%'}}>
                <FontAwesome5 name="warehouse" size={18} color={Colors.primary} />
                <Text>Sector {item.sector.toUpperCase()}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ActionBar navigation={props.navigation} />
            <View style={styles.content}>
                <View style={styles.dataToolbar}>
                    <Text>Filter: </Text>
                    <ButtonGroup 
                        buttons={['All', 'A', 'B', 'C', 'D']} 
                        onPress={onFilterButtonPress} />
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
                    data={sectorsData} 
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    dataActions: {
        flexDirection: 'row',
    },

    actionButton: {
        width: 40,
        height: 40,
        marginLeft: 5,
        padding: 5,
        borderRadius: 5,
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

export default SectorsData;