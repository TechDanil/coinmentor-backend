import { Token } from "../../models/Token";
import { EntitySchema } from "typeorm";

const tokenSchema = new EntitySchema<Token>({
    name: 'Token',
    target: Token,
    columns: {
      id: {
        primary: true,
        type: 'int',
        generated: true,
      },
      userId: {
        type: 'int',
      },
      refreshToken: {
        type: 'varchar',
      },
    },
  });

export const entities = [tokenSchema];