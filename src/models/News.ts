import { ITag } from 'shared/interfaces/news.interface';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class News extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column() 
    price!: number;
    
    @Column() 
    isGrowing!: boolean;

    @Column({ type: 'date' }) 
    date!: Date;

    @Column()
    title!: string;

    @Column()
    source!: string;

    @Column()
    tags!: ITag[];
}