
let input = "apple";

let sql;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/birdbase.db',
                                                sqlite3.OPEN_READ, (err) =>
                                                {
                                                    if(err){
                                                        return console.error(err.message);
                                                    }
                                                }

                                        );
db.all(
    "SELECT * FROM Food WHERE FoodName = ? COLLATE NOCASE",
    [input],
    (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(rows);
    }
);