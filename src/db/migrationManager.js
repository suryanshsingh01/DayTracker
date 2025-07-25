import SQLite from 'react-native-sqlite-storage';
import { migrateToV2 } from './v2';
import { initDB } from './database';

const db = SQLite.openDatabase(
  {
    name: 'tasktable.db',
    location: 'default',
  },
  () => console.log('✅ DB opened for migration'),
  err => console.warn('❌ DB open error', err)
);

const CURRENT_VERSION = 2;

export const runMigrations = () => {
  db.transaction(tx => {
    // ✅ Fix: Removed extra comma in SQL
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS meta (
        key TEXT PRIMARY KEY,
        value TEXT
      );
      `,
      [],
      () => {
        tx.executeSql(
          `SELECT value FROM meta WHERE key = 'schema_version';`,
          [],
          (txObj, resultSet) => {
            let storedVersion = 0;

            if (resultSet.rows.length > 0) {
              storedVersion = parseInt(resultSet.rows.item(0).value, 10);
            } else {
              // No version found - assume Version 1
              storedVersion = 1;

              initDB(tx); // <-- make sure this creates your base schema

              tx.executeSql(
                `INSERT INTO meta (key, value) VALUES (?, ?);`,
                ['schema_version', '1']
              );
            }

           
            if (storedVersion < CURRENT_VERSION) {
              // Run migration
              migrateToV2(tx);

              // Update version
              tx.executeSql(
                `REPLACE INTO meta (key, value) VALUES (?, ?);`,
                ['schema_version', CURRENT_VERSION.toString()]
              );
            }
          }
        );
      }
    );
  });
};
