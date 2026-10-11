const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

const app = express();
app.use(cors());

const db = new sqlite3.Database('./db/birdbase.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) console.error(err.message);
});

const all = promisify(db.all.bind(db));

app.get('/api/search', async (req, res) => {
    const input = req.query.q;
    if (!input) return res.json([]);

    try {
        const foods = await all(
            'SELECT * FROM Food WHERE FoodName LIKE ?',
            [`%${input}%`]
        );

        for (const food of foods) {
            const groups = await all(
                `SELECT BirdGroup.TypeID, BirdGroup.GroupName
                 FROM BirdGroupFood
                 JOIN BirdGroup ON BirdGroup.TypeID = BirdGroupFood.TypeID
                 WHERE BirdGroupFood.FoodID = ?`,
                [food.FoodID]
            );
            for (const group of groups) {
                group.images = await all(
                    'SELECT ImageURL, Credit FROM BirdImage WHERE TypeID = ? ORDER BY SortOrder',
                    [group.TypeID]
                );
            }
            food.birdGroups = groups;
        }

        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//server waits and listens in localhost:3000
app.listen(3000, () => console.log('Server runs at: http://localhost:3000'));