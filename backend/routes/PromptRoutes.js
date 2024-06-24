import { Router } from 'express';
import Joi from 'joi';
import Prompt from '../models/Prompt.js';
import { Tag } from '../models/Tag.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import Like from '../models/Like.js';

const router = Router();

const promptSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    promptText: Joi.string().min(3).required(),
    resultText: Joi.string().optional(),
    resultImage: Joi.string().uri().optional(),
    modelType: Joi.string().required(),
});

const updatePromptSchema = Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    promptText: Joi.string().min(3).optional(),
    resultText: Joi.string().optional(),
    resultImage: Joi.string().uri().optional(),
    modelType: Joi.string().optional(),
});

// Получить все prompt-ы (для всех пользователей)
router.get('/prompts', async (req, res) => {
    try {
        const prompts = await Prompt.findAll({
            include: [
                {
                    model: Tag,
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                },
                { model: User, attributes: ['id', 'username', 'avatar'] },
                { model: Like, attributes: ['id', 'type'] },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'createdAt', 'userId'],
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        });
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении prompt-ов' });
    }
});

// Получить prompt по ID (для всех пользователей)
router.get('/prompts/:id', async (req, res) => {
    try {
        const prompt = await Prompt.findByPk(req.params.id, {
            include: [
                {
                    model: Tag,
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                },
                { model: User, attributes: ['id', 'username', 'avatar'] },
                { model: Like, attributes: ['id', 'type'] },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'createdAt', 'userId'],
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        });
        if (!prompt) {
            return res.status(404).json({ error: 'Prompt не найден' });
        }
        res.status(200).json(prompt);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении prompt-а' });
    }
});

// Создать новый prompt (только для авторизованных пользователей)
router.post('/prompts', authMiddleware, upload.single('resultImage'), async (req, res) => {
    console.log(req.body, req.file);
    const { error } = promptSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { title, promptText, resultText, resultImage, modelType } = req.body;
    try {
        const resultImage = req.file ? `/uploads/${req.file.filename}` : null;
        const newPrompt = await Prompt.create({
            title,
            promptText,
            resultText,
            resultImage,
            modelType,
            userId: req.user,
        });
        console.log(newPrompt);
        res.status(201).json(newPrompt);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при создании prompt-а' });
    }
});

// Обновить prompt (только для авторизованных пользователей)
router.put('/prompts/:id', authMiddleware, upload.single('resultImage'), async (req, res) => {
    const { error } = updatePromptSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const prompt = await Prompt.findByPk(req.params.id, {
            include: [
                {
                    model: Tag,
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                },
                { model: User, attributes: ['id', 'username', 'avatar'] },
                { model: Like, attributes: ['id', 'type'] },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'createdAt', 'userId'],
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],});
        if (!prompt) {
            return res.status(404).json({ error: 'Prompt не найден' });
        }

        if (prompt.userId !== req.user) {
            return res.status(403).json({ error: 'Нет прав для редактирования этого prompt-а' });
        }

        const { title, promptText, resultText, modelType } = req.body;
        const resultImage = req.file ? `/uploads/${req.file.filename}` : null;

        if (title) prompt.title = title;
        if (promptText) prompt.promptText = promptText;
        if (resultText) prompt.resultText = resultText;
        if (resultImage) prompt.resultImage = resultImage;
        if (modelType) prompt.modelType = modelType;

        await prompt.save();
        res.status(200).json(prompt);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при обновлении prompt-а' });
    }
});

// Удалить prompt (только для авторизованных пользователей)
router.delete('/prompts/:id', authMiddleware, async (req, res) => {
    try {
        const prompt = await Prompt.findByPk(req.params.id);
        if (!prompt) {
            return res.status(404).json({ error: 'Prompt не найден' });
        }

        if (prompt.userId !== req.user) {
            return res.status(403).json({ error: 'Нет прав для удаления этого prompt-а' });
        }

        await prompt.destroy();
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Произошла ошибка при удалении prompt-а' });
    }
});

export default router;
