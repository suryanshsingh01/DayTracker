export const migrateToV2 = tx => {
  console.warn('🚀 Running migration to V2');

  // Add a new column to "tasks" table
  tx.executeSql(
    `ALTER TABLE tasks ADD COLUMN isDone INTEGER DEFAULT 0`
  );
};
