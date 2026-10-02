const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./birdbase.db', (err) => {
    if (err) {
        console.error('Fehler beim Öffnen:', err.message);
        return;
    }
    console.log('Connected to the database.');

    db.all('SELECT * FROM Food', (err, rows) => {
        if (err) {
            console.error('Query-Fehler:', err.message);
        } else {
            console.log(`Gefunden: ${rows.length} Einträge`);
            console.table(rows);
        }

        db.close((err) => {
            if (err) console.error(err.message);
            console.log('Close the database connection.');
        });
    });
});