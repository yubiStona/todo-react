import { DataSource } from "typeorm";
import {Task} from "../entities/task.entity"
import { User } from "../entities/user.entity";
const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "todoDB",
    synchronize: true,
    logging: true,
    entities: [Task,User],
    subscribers: [],
    migrations: [],

})
export default AppDataSource;