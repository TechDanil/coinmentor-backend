import { EntitySchema } from "typeorm";
import { User } from "../../models/User";

const userSchema = new EntitySchema({
    name: 'User',
    target: User,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        username: {
            type: 'varchar',
        },
        email: {
            type: 'varchar',
        },
        password: {
            type: 'varchar',
        },
    },
});

export const entities = [userSchema];