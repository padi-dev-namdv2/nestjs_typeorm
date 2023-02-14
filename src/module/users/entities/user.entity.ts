import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, DeleteDateColumn} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import { JoinTable, JoinColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(4, {
        message: 'Username is too short',
    })
    @MaxLength(50, {
        message: 'Username is too long',
    })
    name: string;

    @Column({ unique: true })
    @MinLength(20, {
        message: 'Email is too short',
    })
    @MaxLength(50, {
        message: 'Email is too long',
    })
    email: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    @DeleteDateColumn()
    deleted_at: Date
}