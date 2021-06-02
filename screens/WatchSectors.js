import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import LocalDB from '../utils/LocalDB';
import ActionBar from '../components/ActionBar';
import StyledButton from '../components/StyledButton';

const WatchSectors = props => {
    const [sectors, setSectors] = useState([
        { sector: 'a', cars: 0 },
        { sector: 'b', cars: 0 },
        { sector: 'c', cars: 0 },
        { sector: 'd', cars: 0 },
    ]);

    useEffect(() => {
        LocalDB.selectRecords('sectors', ['sector', 'type', 'created_at']).then(rs => {
            const newSectors = [...sectors];

            rs.rows._array.forEach(sectorItem => {    
                const change = sectorItem.type === 'departure' ? -1 : 1;
                const found = newSectors.find(s => s.sector === sectorItem.sector);

                found.cars += change;
            });

            setSectors(newSectors);
        });
    }, []);

    const onButtonHandler = (sector, operation) => {
        const date = new Date(Date.now());
        const sectorCars = operation === 'minus' ? sector.cars - 1 : sector.cars + 1;
        const tempSectors = [...sectors].filter(s => s.sector !== sector.sector);
        const newSectors = [...tempSectors, { sector: sector.sector, cars: sectorCars }];
        
        LocalDB.insertRecord('sectors', ['sector', 'type', 'created_at'], {
            sector: sector.sector, 
            type: operation === 'minus' ? 'departure' : 'arrival',
            created_at: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        }).then(rs => {
            setSectors([...newSectors.sort((a, b) => a.sector.localeCompare(b.sector))]);
            showMessage({message: `Record with ${operation === 'minus' ? 'leaving' : 'arriving'} car successfully saved.`, type: 'success'})
        }).catch(err => console.error(err));
    }

    return (
        <View style={styles.container}>
            <ActionBar navigation={props.navigation} />
            <View style={styles.content}>
                {sectors.map(sector => {
                    return (
                        <View key={sector.sector} style={styles.section}>
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionTitle}>Sector {sector.sector.toUpperCase()}</Text>
                                <Text style={styles.sectionSmall}>{sector.cars} cars</Text>
                            </View>
                            <View style={styles.buttonsRow}>
                                <StyledButton 
                                    style={styles.button} 
                                    icon="minus"
                                    iconSize={24}
                                    disabled={sector.cars === 0}
                                    onPress={onButtonHandler.bind(this, sector, 'minus')} />
                                <StyledButton 
                                    style={styles.button} 
                                    icon="plus"
                                    iconSize={24}
                                    onPress={onButtonHandler.bind(this, sector, 'plus')} />
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

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
        alignItems: 'baseline',
    },

    sectionTitle: {
        fontSize: 24
    },

    sectionSmall: {
        paddingLeft: 10,
        paddingBottom: 3,
        color: '#4d4d4d'
    },

    buttonsRow: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        justifyContent: 'space-around'
    },

    button: {
        width: 80,
        height: 80,
        borderRadius: 15
    }
});

export default WatchSectors;