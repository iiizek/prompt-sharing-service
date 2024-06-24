import { Router } from 'express';
import User from '../models/User.js';
import Prompt from '../models/Prompt.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();

router.use(authMiddleware);

// Получить общую статистику
router.get('/admin/statistics', async (req, res) => {
    try {
        const userCount = await User.count();
        const promptCount = await Prompt.count();
        const commentCount = await Comment.count();
        const likeCount = await Like.count();

        res.status(200).json({
            users: userCount,
            prompts: promptCount,
            comments: commentCount,
            likes: likeCount,
        });
    } catch (err) {
        res.status(500).json({ error: 'Произошла ошибка при получении статистики' });
    }
});

export default router;
