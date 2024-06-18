import { Router } from 'express';
import { Op } from 'sequelize';
import Prompt from '../models/Prompt.js';
import { Tag } from '../models/Tag.js';

const router = Router();

// Маршрут для поиска промптов по ключевым словам и тегам
///Пример: api/search?query=ключевое_слово&tags=тег1,тег2
router.get('/search', async (req, res) => {
    const { query, tags } = req.query;

    try {

        let prompts;
        if (tags) {
            const tagList = tags.split(',').map((tag) => tag.trim());
            prompts = await Prompt.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${query}%` } },
                        { promptText: { [Op.iLike]: `%${query}%` } },
                        { resultText: { [Op.iLike]: `%${query}%` } },
                    ],
                },
                include: {
                    model: Tag,
                    where: { name: { [Op.in]: tagList } },
                },
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
            });
        }

        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при поиске промптов' });
    }
});

export default router;
