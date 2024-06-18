import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Prompt from './Prompt.js';

const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    promptId: {
        type: DataTypes.INTEGER,
        references: {
            model: Prompt,
            key: 'id',
        },
    },
});

User.belongsToMany(Prompt, { through: Favorite, as: 'Favorites' });
Prompt.belongsToMany(User, { through: Favorite, as: 'FavoritedBy' });

export default Favorite;
