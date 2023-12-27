import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Token extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	userId!: number

	@Column()
	refreshToken!: string
}
