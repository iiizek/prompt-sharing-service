import { Router } from 'express';
import Joi from 'joi';

import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// Схема валидации для пользователя
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    avatar: Joi.string().uri().optional(),
    bio: Joi.string().max(500).optional(),
    isAdmin: Joi.boolean().default(false),
});

const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    avatar: Joi.string().uri().optional(),
    bio: Joi.string().max(500).optional(),
    isAdmin: Joi.boolean().default(false).optional(),
});

// Получить список всех пользователей
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении пользователей' });
    }
});

// Создать нового пользователя
router.post('/users', authMiddleware, async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password, avatar, bio, isAdmin } = req.body;
    try {
        const newUser = await User.create({ username, email, password, avatar, bio, isAdmin });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при создании пользователя' });
    }
});

// Получить пользователя по ID (только для авторизованных пользователей)
router.get('/users/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); //Найти по Personal Key
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении пользователя' });
    }
});

// Обновить пользователя (только для авторизованных пользователей)
router.put('/users/:id', authMiddleware, async (req, res) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const { username, email, password, avatar, bio, isAdmin } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password; // Пароль будет захеширован в модели
        if (avatar) user.avatar = avatar;
        if (bio) user.bio = bio;
        if (isAdmin) user.isAdmin = isAdmin;

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при обновлении пользователя' });
    }
});

// Удалить пользователя (только для авторизованных пользователей)
router.delete('/users/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        await user.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при удалении пользователя' });
    }
});

export default router;
