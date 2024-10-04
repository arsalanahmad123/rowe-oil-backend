const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL,
            'https://r0owe-4f0f0.web.app',
            'https://test.rowemotoroil.net',
            'https://rowe-oil-frontend.vercel.app',
            'http://localhost:5173',
        ],
        credentials: true,
    })
);

app.use('/api', router);

app.get('/health', (req, res) => {
    res.json({ message: 'Everything okay' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log('Connected to DB');
            console.log('Server is running on port', PORT);
        });
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

startServer();
