import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('prompt_sharing_db', 'postgres', '123', {
	host: 'localhost',
	dialect: 'postgres',
	logging: false,
});

export default sequelize;