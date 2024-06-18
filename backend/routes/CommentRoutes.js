import { Router } from 'express';
import Joi from 'joi';
import Comment from '../models/Comment.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

const commentSchema = Joi.object({
    content: Joi.string().min(3).required(),
    promptId: Joi.number().integer().required(),
});

const updateCommentSchema = Joi.object({
    content: Joi.string().min(3).required(),
});

// Получить все комментарии для конкретного prompt-а
router.get('/prompts/:promptId/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { promptId: req.params.promptId } });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении комментариев' });
    }
});

// Создать новый комментарий (только для авторизованных пользователей)
router.post('/prompts/:promptId/comments', authMiddleware, async (req, res) => {
    const { error } = commentSchema.validate({ ...req.body, promptId: req.params.promptId });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { content } = req.body;
    try {
        const newComment = await Comment.create({
            content,
            promptId: req.params.promptId,
            userId: req.user,
        });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при создании комментария' });
    }
});

// Обновить комментарий (только для авторизованных пользователей)
router.put('/comments/:id', authMiddleware, async (req, res) => {
    const { error } = updateCommentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Комментарий не найден' });
        }

        if (comment.userId !== req.user) {
            return res.status(403).json({ error: 'Нет прав для редактирования этого комментария' });
        }

        const { content } = req.body;
        comment.content = content;

        await comment.save();
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при обновлении комментария' });
    }
});

// Удалить комментарий (только для авторизованных пользователей)
router.delete('/comments/:id', authMiddleware, async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Комментарий не найден' });
        }

        if (comment.userId !== req.user) {
            return res.status(403).json({ error: 'Нет прав для удаления этого комментария' });
        }

        await comment.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при удалении комментария' });
    }
});

export default router;
