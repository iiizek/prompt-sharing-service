import { Router } from 'express';
import Favorite from '../models/Favorite.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// Добавить промпт в избранное
router.post('/favorites/:promptId', authMiddleware, async (req, res) => {
    const userId = req.user;
    const { promptId } = req.params;

    try {
        const favorite = await Favorite.create({ userId, promptId });
        res.status(201).json(favorite);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при добавлении в избранное' });
    }
});

// Удалить промпт из избранного
router.delete('/favorites/:promptId', authMiddleware, async (req, res) => {
    const userId = req.user;
    const { promptId } = req.params;

    try {
        await Favorite.destroy({ where: { userId, promptId } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при удалении из избранного' });
    }
});

// Получить избранные промпты пользователя
router.get('/favorites', authMiddleware, async (req, res) => {
    const userId = req.user;

    try {
        const favorites = await Favorite.findAll({ where: { userId } });
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при получении избранного' });
    }
});

export default router;
