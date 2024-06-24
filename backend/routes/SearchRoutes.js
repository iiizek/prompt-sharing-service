import { Router } from 'express';
import { Op } from 'sequelize';
import Prompt from '../models/Prompt.js';
import { Tag } from '../models/Tag.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';

const router = Router();

// Маршрут для поиска промптов по ключевым словам и тегам
///Пример: api/search?query=ключевое_слово&tags=тег1,тег2
router.get('/search', async (req, res) => {
    const { query, tags } = req.query;

    try {
        let prompts;
        if (tags) {
            const tagList = tags.split(',').map(Number);
            prompts = await Prompt.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${query}%` } },
                        { promptText: { [Op.iLike]: `%${query}%` } },
                        { resultText: { [Op.iLike]: `%${query}%` } },
                    ],
                },
                include: [
                    {
                        model: Tag,
                        where: { id: { [Op.in]: tagList } },
                        attributes: ['id', 'name'],
                        through: { attributes: [] },
                    },
                    { model: User, attributes: ['id', 'username', 'avatar'] },
                    { model: Like, attributes: ['id', 'type'] },
                    {
                        model: Comment,
                        attributes: ['id', 'content', 'createdAt'],
                        include: [{ model: User, attributes: ['username'] }],
                    },
                ],
            });
        } else {
            prompts = await Prompt.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${query}%` } },
                        { promptText: { [Op.iLike]: `%${query}%` } },
                        { resultText: { [Op.iLike]: `%${query}%` } },
                    ],
                },

                include: [
                    { model: Tag, attributes: ['id', 'name'], through: { attributes: [] } },
                    { model: User, attributes: ['id', 'username', 'avatar'] },
                    { model: Like, attributes: ['id', 'type'] },
                    {
                        model: Comment,
                        attributes: ['id', 'content', 'createdAt'],
                        include: [{ model: User, attributes: ['username'] }],
                    },
                ],
            });
        }

        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при поиске промптов' });
    }
});

export default router;
