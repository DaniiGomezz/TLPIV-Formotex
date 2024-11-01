import { IDataBaseConfig } from '../interface/db.interface'
import { Dialect, Sequelize } from 'sequelize';
import { envConfig } from '../config/environments';
// import { defineRelations } from '../models/relations';

export class DbConfig implements IDataBaseConfig {
    public sequelize: Sequelize;

    constructor () {
        const dbConfig = envConfig.getEnvDataBase()
        this.sequelize = new Sequelize(
            dbConfig.dbName,
            dbConfig.dbUser,
            dbConfig.dbPassword, 
            {
                host: dbConfig.dbHost,
                dialect: dbConfig.dbDialect as Dialect, // lo convertimos a un tipo aceptado por Sequelize
                port: parseInt(dbConfig.dbPort, 10)
            }
        )
        // defineRelations(this.sequelize);
    }

    async connectDb(): Promise<void> {
        try {
            await this.sequelize.sync({ force: false });
            console.log(`Base de datos conectada`);
        } catch (error) {
            console.error('No se ha podido conectar a la base de datos', error);
        }
    }
}

export const dbConfig = new DbConfig();