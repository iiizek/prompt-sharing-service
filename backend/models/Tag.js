import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Prompt from './Prompt.js';

const Tag = sequelize.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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

const PromptTag = sequelize.define(
    'PromptTag',
    {
        promptId: {
            type: DataTypes.INTEGER,
            references: {
                model: Prompt,
                key: 'id',
            },
        },
        tagId: {
            type: DataTypes.INTEGER,
            references: {
                model: Tag,
                key: 'id',
            },
        },
    },
    {
        timestamps: false,
    },
);

Prompt.belongsToMany(Tag, { through: PromptTag });
Tag.belongsToMany(Prompt, { through: PromptTag });

export { Tag, PromptTag };
