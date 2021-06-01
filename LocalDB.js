import * as SQLite from 'expo-sqlite';

class LocalDB {
    constructor(dbName) {
        this._db = SQLite.openDatabase(dbName);
        this._initializeTables();
    }

    selectRecords(tableName, columns, whereSql='', parameters=[]) {
        return new Promise((resolve, reject) => {
            const formattedColumns = columns.join(', ');
            const sql = `SELECT ${formattedColumns} FROM ${tableName} ${whereSql !== '' ? ' WHERE' : ''} ${whereSql}`;

            this._db.transaction(tx => tx.executeSql(sql, parameters, (_, rs) => resolve(rs), err => reject(err)));
        });
    }

    insertRecord(tableName, columns, object) {
        return new Promise((resolve, reject) => {
            const formattedColumns = columns.join(',');
            const placeholders = columns.map(_ => '?').join(',');
            const sql = `INSERT INTO ${tableName} (${formattedColumns}) VALUES(${placeholders})`;
            
            this._db.transaction(tx => tx.executeSql(sql, columns.map(col => object[col]), (_, rs) => resolve(rs), err => reject(err)));
        });
    }

    deleteRecords(tableName, whereSql='', parameters=[]) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${tableName} ${whereSql !== '' ? ' WHERE' : ''} ${whereSql}`;

            this._db.transaction(tx => tx.executeSql(sql, parameters, (_, rs) => resolve(rs), err => reject(err)));
        });
    }

    _initializeTables() {
        this._db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS sectors (id INTEGER PRIMARY KEY, sector TEXT, type TEXT, created_at TEXT)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS departures (id INTEGER PRIMARY KEY, type TEXT, created_at TEXT)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS queue_times (id INTEGER PRIMARY KEY, duration REAL, created_at TEXT)');
        }, err => console.error(err));
    }
}

export default new LocalDB('parking_site_db.db');