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
    console.log("1", req.body);
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

        await pool.query('INSERT INTO books (owner, title, author, price, description, category, condition) VALUES ($1, $2, $3, $4, $5, $6, $7)', [user_id, title, author, price, description, category, condition]);

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
        const result = await pool.query('SELECT * FROM users u LEFT JOIN books b ON b.owner = u.user_id WHERE LOWER(u.username) = LOWER($1)', [username]);
        console.log("2", result.rows.length);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userInfo = {
            user_id: result.rows[0].user_id,
            username: result.rows[0].username,
            email: result.rows[0].email,
            about: result.rows[0].about,
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

app.put('/profile/:username/about', async (req, res) => {
    const { username } = req.params;
    const { about } = req.body;

    try {
        const result = await pool.query('UPDATE users SET about = $1 WHERE username = $2 RETURNING *', [about, username]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'About updated successfully', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating description' });
    }
});

app.put('/editbook/:bookId/:username', async (req, res) => {
    const { bookId, username } = req.params;
    const { title, author, price, description, category, condition, image } = req.body;

    try {
        const bookResult = await pool.query('SELECT owner FROM books WHERE book_id = $1', [bookId]);

        if (bookResult.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const bookOwner = bookResult.rows[0].owner;

        const userResult = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = userResult.rows[0].user_id;

        if (bookOwner !== userId) {
            return res.status(403).json({ message: 'Unauthorized to edit this book' });
        }

        await pool.query(
            'UPDATE books SET title = $1, author = $2, price = $3, description = $4, category = $5, condition = $6, image = $7 WHERE book_id = $8',
            [title, author, price, description, category, condition, image, bookId]
        );

        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating book' });
    }
});

app.get('/bookdetail/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const { username } = req.body;

    try {
        const result = await pool.query('SELECT * FROM books WHERE book_id = $1', [bookId]);
        const userId = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(result.rows[0], result, userId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving book details' });
    }
});

app.delete('/deletebook/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const { username } = req.body; 

    try {
        const bookResult = await pool.query('SELECT owner FROM books WHERE book_id = $1', [bookId]);

        if (bookResult.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const bookOwner = bookResult.rows[0].owner;

        const userResult = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = userResult.rows[0].user_id;

        if (bookOwner !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this book' });
        }

        await pool.query('DELETE FROM books WHERE book_id = $1', [bookId]);

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting book' });
    }
});

app.get('/userid/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const result = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user_id: result.rows[0].user_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user ID' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});