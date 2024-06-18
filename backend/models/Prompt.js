import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Prompt = sequelize.define('Prompt', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    promptText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    resultText: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    resultImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    modelType: {
        type: DataTypes.STRING,
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
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

//Связь между сущностями User и Prompt
User.hasMany(Prompt, { foreignKey: 'userId' });
Prompt.belongsTo(User, { foreignKey: 'userId' });

export default Prompt;