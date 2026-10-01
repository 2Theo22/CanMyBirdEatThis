const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./birdbase.sqlite', (err) => {
    if (err) {
        console.error('Fehler beim Öffnen:', err.message);
        return;
    }
    console.log('Connected to the database.');

    db.close((err) => {
        if (err) console.error(err.message);
        console.log('Close the database connection.');
    });
});

