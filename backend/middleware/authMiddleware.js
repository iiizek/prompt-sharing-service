import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Нет доступа!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Срок сессии истек, авторизуйтесь заново.' });
    }
};

export default authMiddleware;
