import SQLite from 'react-native-sqlite-storage';

//created db
const db = SQLite.openDatabase(
  {
    name: 'tasktable.db',
    location: 'default',
  },
  () => {
   // console.warn('database created');
  },
  error => {
    console.warn('error', error);
  },
);

//table creation

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(`
            CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            PASSWORD TEXT NOT NULL,
            task_id INTEGER,
            FOREIGN KEY(task_id) REFERENCES user(id)
            );
            `);
    tx.executeSql(`
            CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT,
            created_at DATE
            );
            `);
  });
};

//crud op
//Post op
export const inserttasks = (task, date, success, error) => {
  let formattedDate = 'Invalid Date';

  try {
    // Safely parse to Date object
    const dateObj = new Date(date);
    formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`; // "YYYY-MM-DD"
  } catch (err) {
    console.warn('❌ Failed to convert date:', date);
    error(err);
    return;
  }

  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO  tasks (task,created_at) VALUES (?,?)',
        [task, formattedDate],
        (_, res) => {
          success(res);
        },
        (_, err) => {
          error(err);
        },
      );
    },
    err => {
      console.warn('Transaction Error:', err);
      error(err);
    },
    console.log('Success: Task added:', task, formattedDate)

  );
};

//get op

export const gettasks = (date, success, error) => {
  if (!date) {
    console.warn('get tasks error: data is undefined');
    return error('Date is undefined');
  }


  let formattedDate;

  if (typeof date === 'string') {
    formattedDate = date;
  } else if (date instanceof Date) {
    formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
   
  } else {
    console.warn('❌ gettasks error: Invalid date type');
    return error('Invalid date format');
  }

 

  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM tasks WHERE created_at = ?`,
      [formattedDate],
      (_, { rows }) => {
        const result = [];
        for (let i = 0; i < rows.length; i++) {
          result.push(rows.item(i));
        }
        success(result);
      },
      (_, err) => error(err),
    );
  });

  

};

//delete

export const deleteCourse = (id, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM tasks where id=?',
      [id],
      res => {
        success(res);
      },
      err => {
        error(err);
      },
    );
  });
};

//Update
export const updatetasks = (id, newTask, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        "UPDATE tasks SET task=? WHERE id=?",
        [newTask, id],
        (_, res) => {
         
          success(res);
          return true; // optional but safe
        },
        (_, err) => {
          console.warn('❌ SQL execution error:', err);
          error(err);
          return false; // <- necessary
        }
      );
    },
    err => {
      console.warn('❌ Transaction error:', err);
      error(err);
    },
    () => {
      
    }
  );
};
