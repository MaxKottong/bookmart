require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body.formData;
    const date = new Date().toLocaleDateString();
    try {
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const emailExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        await pool.query('INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, $4)', [username, email, hashedPassword, date]);
        res.status(201).json({ message: 'Registration Successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const user = result.rows[0];

        if (await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.post('/addbook/:username', async (req, res) => {
    const { username } = req.params;
    const { title, author, price, description, category, condition } = req.body.bookDetails;

    try {
        const result = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user_id = result.rows[0].user_id;

        await pool.query('INSERT INTO books (owner, title, author, price, description, category, condition) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, title, author, price, description, category, condition]);

        const bookResult = await pool.query('SELECT book_id FROM books WHERE owner = $1 AND title = $2 AND author = $3 AND price = $4 AND description = $5 AND category = $6 AND condition = $7', [user_id, title, author, price, description, category, condition]);
        const bookId = bookResult.rows[0];

        res.status(201).json({ message: 'Book Added Successfully', bookId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding Book' })
    }
});

app.get('/profile/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users u LEFT JOIN books b ON b.owner = u.user_id WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userInfo = {
            user_id: result.rows[0].user_id,
            username: result.rows[0].username,
            email: result.rows[0].email,
            description: result.rows[0].description,
            created_at: result.rows[0].created_at,
            books: result.rows
                .filter(row => row.book_id)
                .map(r => ({
                    book_id: r.book_id,
                    title: r.title,
                    author: r.author,
                    price: r.price,
                    condition: r.condition,
                    image: r.image,
                    isListed: r.isListed
                }))
        };

        res.status(200).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' });
    }
});

app.put('/profile/:username/description', async (req, res) => {
    const { username } = req.params;
    const { description } = req.body;

    try {
        const result = await pool.query('UPDATE users SET description = $1 WHERE username = $2 RETURNING *', [description, username]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Description updated successfully', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating description' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});