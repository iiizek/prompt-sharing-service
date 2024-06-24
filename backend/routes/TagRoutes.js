import { Router } from 'express';
import Joi from 'joi';
import { Tag, PromptTag } from '../models/Tag.js';
import Prompt from '../models/Prompt.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();

// Схема валидации для тега
const tagSchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
});

// Получить все теги
router.get('/tags', async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении тегов' });
    }
});

//Получить теги определенного prompt-а
router.get('/prompts/:promptId/tags', async (req, res) => {
    try {
        const prompt = await Prompt.findByPk(req.params.promptId);
        if (!prompt) {
            return res.status(404).json({ error: 'Prompt не найден' });
        }
        const tags = await prompt.getTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении тегов' });
    }
});

// Создать новый тег (только для админов)
router.post('/tags', authMiddleware, adminMiddleware, async (req, res) => {
    const { error } = tagSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name } = req.body;
    try {
        const tag = await Tag.create({ name });
        res.status(201).json(tag);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при создании тега' });
    }
});

// Добавить тег к prompt-у (только для авторизованных пользователей)
router.post('/prompts/:promptId/tags', authMiddleware, async (req, res) => {
    console.log(req.params.promptId);
    console.log(req.body);
    const { error } = tagSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name } = req.body;
    try {
        const [tag] = await Tag.findOrCreate({ where: { name } });
        const prompt = await Prompt.findByPk(req.params.promptId);

        if (!prompt) {
            return res.status(404).json({ error: 'Prompt не найден' });
        }

        await prompt.addTag(tag);
        res.status(201).json({ message: 'Тег добавлен к prompt-у', tag });
        console.log(tag);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при добавлении тега к prompt-у' });
    }
});

// Удалить тег от prompt-а (только для авторизованных пользователей)
router.delete('/prompts/:promptId/tags/:tagId', authMiddleware, async (req, res) => {
    try {
        const prompt = await Prompt.findByPk(req.params.promptId);
        const tag = await Tag.findByPk(req.params.tagId);

        if (!prompt || !tag) {
            return res.status(404).json({ error: 'Prompt или тег не найден' });
        }

        await prompt.removeTag(tag);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при удалении тега от prompt-а' });
    }
});

export default router;
