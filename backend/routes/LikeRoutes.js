import { Router } from 'express';
import Joi from 'joi';
import Like from '../models/Like.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// Схема валидации для лайка
const likeSchema = Joi.object({
    type: Joi.string().valid('like', 'dislike').required(),
    promptId: Joi.number().integer().required(),
});

const UpdateLikeSchema = Joi.object({
    type: Joi.string().valid('like', 'dislike').required(),
});

// Получить все лайки для конкретного prompt-а
router.get('/prompts/:promptId/likes', async (req, res) => {
    try {
        const likes = await Like.findAll({ where: { promptId: req.params.promptId } });
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении лайков' });
    }
});

// Создать новый лайк (только для авторизованных пользователей)
router.post('/prompts/:promptId/likes', authMiddleware, async (req, res) => {
    const { error } = likeSchema.validate({ ...req.body, promptId: req.params.promptId });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { type } = req.body;
    try {
        const existingLike = await Like.findOne({
            where: {
                userId: req.user,
                promptId: req.params.promptId,
            },
        });

        if (existingLike) {
            return res.status(400).json({ error: 'Вы уже оценили этот prompt' });
        }

        const newLike = await Like.create({
            type,
            promptId: req.params.promptId,
            userId: req.user,
        });
        res.status(201).json(newLike);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при создании лайка' });
    }
});

// Обновить лайк (только для авторизованных пользователей)
router.put('/likes/:id', authMiddleware, async (req, res) => {
    const { error } = UpdateLikeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const like = await Like.findByPk(req.params.id);
        if (!like) {
            return res.status(404).json({ error: 'Лайк не найден' });
        }

        if (like.userId !== req.user) {
            return res.status(403).json({ error: 'Нет прав для редактирования этого лайка' });
        }

        const { type } = req.body;
        like.type = type;

        await like.save();
        res.status(200).json(like);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при обновлении лайка' });
    }
});

// Удалить лайк (только для авторизованных пользователей)
router.delete('/likes/:id', authMiddleware, async (req, res) => {
    try {
        const like = await Like.findByPk(req.params.id);
        if (!like) {
            return res.status(404).json({ error: 'Лайк не найден' });
        }

        if (like.userId !== req.user) {
            return res.status(403).json({ error: 'Нет прав для удаления этого лайка' });
        }

        await like.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при удалении лайка' });
    }
});

export default router;
