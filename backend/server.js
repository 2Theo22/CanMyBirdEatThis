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
    const input = (req.query.q || '').trim();
    if (!input) return res.json([]);

    try {
        const foods = await all(
            `SELECT FoodID,
                    FoodName,
                    Danger,
                    SmallPortionWarn AS SmallPortionWarning,
                    SafetyLevel,
                    Type,
                    CertainDeadWarn
             FROM Food
             WHERE FoodName LIKE ?
             ORDER BY FoodName`,
            [`%${input}%`]
        );

        const result = [];

        for (const food of foods) {
            const groups = await all(
                `SELECT BirdGroup.TypeID, BirdGroup.GroupName
                 FROM BirdGroupFood
                          JOIN BirdGroup ON BirdGroup.TypeID = BirdGroupFood.TypeID
                 WHERE BirdGroupFood.FoodID = ?
                 ORDER BY BirdGroup.GroupName`,
                [food.FoodID]
            );

            const birdGroups = [];
            for (const group of groups) {
                const images = await all(
                    `SELECT ImageURL, Credit
                     FROM BirdImage
                     WHERE TypeID = ?
                     ORDER BY SortOrder`,
                    [group.TypeID]
                );
                birdGroups.push({ GroupName: group.GroupName, Images: images });
            }

            result.push({
                FoodName: food.FoodName,
                Danger: food.Danger,
                SmallPortionWarning: food.SmallPortionWarning,
                SafetyLevel: food.SafetyLevel,
                Type: food.Type,
                CertainDeadWarn: food.CertainDeadWarn,
                BirdGroups: birdGroups
            });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// server waits and listens on localhost:3000
app.listen(3000, () => console.log('Server runs at: http://localhost:3000'));