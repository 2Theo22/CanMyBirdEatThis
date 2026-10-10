const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());

const db = new sqlite3.Database('./db/birdbase.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) console.error(err.message);
});


app.get('/api/search', (req, res) => {
    const input = req.query.q;
    if (!input) return res.json([]);

    db.all(
        'SELECT * FROM Food WHERE FoodName = ? COLLATE NOCASE',
        [input],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});
//server waits and listens in localhost:3000
app.listen(3000, () => console.log('Server runs at: http://localhost:3000'));