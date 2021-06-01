import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';

import LocalDB from '../LocalDB';
import ActionBar from '../components/ActionBar';
import StyledButton from '../components/StyledButton';
import ButtonGroup from '../components/ButtonGroup';

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

    const onClearButtonPress = () => {
        LocalDB.deleteRecords('sectors')
            .then(_ => {
                setSectorsData([]);
            });
    }

    const showDefaultMessage = () => {
        if (sectorsData.length === 0)
            return <Text style={styles.defaultMessage}>No sectors data found.</Text>;
    } 

    const renderItem = ({item}) => (
        <View style={styles.dataRow}>
            <Text>{item.created_at}</Text>
            <Text>Sector {item.sector.toUpperCase()}</Text>
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
                        <StyledButton style={styles.actionButton} title="E" color="green" />
                        <StyledButton style={styles.actionButton} title="V" color="red" onPress={onClearButtonPress} />
                    </View>
                </View>
                <FlatList 
                    data={sectorsData} 
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{flexGrow: 1, marginTop: 15}}
                    ListEmptyComponent={<View style={styles.defaultContainer}><Text style={styles.defaultMessage}>No sectors data found.</Text></View>} />
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

export default SectorsData;