import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
    const user = await User.findByPk(req.user);
    if (user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: 'Доступ запрещен: требуется права администратора' });
    }
};

export default adminMiddleware;
