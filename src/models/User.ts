import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import bcrypt from 'bcrypt';
import { PASSWORD_HASH_LENGTH } from '../constants/index.constants';

Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    username!: string;
  
    @Column()
    email!: string;
  
    @Column()
    password!: string;

    @Column({ nullable: true }) 
    refreshToken!: string | null; 

    hashPassword = async () => {
        this.password = await bcrypt.hash(this.password, PASSWORD_HASH_LENGTH);
    }
}