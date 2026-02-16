const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Serve the front end files statically
app.use(express.static(path.join(__dirname, 'front end')));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // CHANGE THIS to your MySQL username
    password: 'password', // CHANGE THIS to your MySQL password
    database: 'cyber_shield_db' // CHANGE THIS to your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Registration Endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ message: 'Database error occurred.' });
        } else {
            res.status(200).json({ message: 'Agent registered successfully!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});