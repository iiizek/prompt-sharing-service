import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import sequelize from './config/database.js';

import UserRoutes from './routes/UserRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import PromptRoutes from './routes/PromptRoutes.js';
import CommentRoutes from './routes/CommentRoutes.js';
import LikeRoutes from './routes/LikeRoutes.js';
import TagRoutes from './routes/TagRoutes.js';
import SearchRoutes from './routes/SearchRoutes.js';
import FavoriteRoutes from './routes/FavoriteRoutes.js'
import UploadRoutes from './routes/UploadRoutes.js';
import AdminRoutes from './routes/AdminRoutes.js';

import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));

app.use('/api', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api', PromptRoutes);
app.use('/api', CommentRoutes);
app.use('/api', LikeRoutes);
app.use('/api', TagRoutes);
app.use('/api', SearchRoutes);
app.use('/api', FavoriteRoutes);
app.use('/api', UploadRoutes);
app.use('/api', AdminRoutes);

app.get('/', (req, res) => {
    res.send('Hello, dev!');
});

sequelize
    .authenticate()
    .then(() => {
        console.log('🐘 Подключение к базе данных PostgreSQL произведено успешно.');
        sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT} 🚀`);
        });
    })
    .catch((err) => {
        console.error('🐞Ошибка подключения к базе данных PostgreSQL:', err);
    });