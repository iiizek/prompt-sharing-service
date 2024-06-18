import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Prompt from "./Prompt.js";

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('like', 'dislike'),
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

User.hasMany(Like, { foreignKey: 'userId' });
Prompt.hasMany(Like, { foreignKey: 'promptId' });
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Prompt, { foreignKey: 'promptId' });

export default Like;