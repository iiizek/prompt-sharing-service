import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Prompt from './Prompt.js';

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    promptId: {
        type: DataTypes.INTEGER,
        references: {
            model: Prompt,
            key: 'id',
        },
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

User.hasMany(Comment, { foreignKey: 'userId' });
Prompt.hasMany(Comment, { foreignKey: 'promptId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Prompt, { foreignKey: 'promptId' });

export default Comment;