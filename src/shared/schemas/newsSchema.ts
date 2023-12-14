import { News } from "../../models/News";
import { EntitySchema } from "typeorm";

const newsSchema = new EntitySchema({
    name: 'News',
    target: News,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        price: {
            type: 'int',
        },
        isGrowing: {
            type: 'boolean',
        },
        date: {
            type: 'date',
        },
        title: {
            type: 'varchar',
        },
        source: {
            type: 'varchar',
        },
        tags: {
            type: 'simple-array',
        },
    },
});

export const entities = [newsSchema];