import { Router } from 'express';
import upload from '../middleware/uploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = Router();

// Маршрут для загрузки аватарки пользователя
router.post('/upload/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findByPk(req.user);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // Обновляем ссылку на аватар в базе данных
        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();

        res.status(200).json({ url: user.avatar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при загрузке аватара' });
    }
    
});

export default router;
