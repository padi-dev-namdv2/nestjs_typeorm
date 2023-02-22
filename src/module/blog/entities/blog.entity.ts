import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";

export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MaxLength(255)
    @MinLength(6)
    title: string

    @Column()
    @MaxLength(255)
    @MinLength(6)
    description: string

    @Column()
    @MaxLength(255)
    content: string

    @Column()
    thumbmail: string

    @Column()
    userId: number

    @Column()
    count_view: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
