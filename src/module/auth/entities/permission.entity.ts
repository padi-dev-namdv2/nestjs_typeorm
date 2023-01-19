import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import { Role } from "./role.entity";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(4, {
        message: 'Name is too short',
    })
    @MaxLength(50, {
        message: 'Name is too long',
    })
    name: string;

    @Column()
    @MinLength(4)
    @MaxLength(50)
    path: string;

    @Column()
    @MinLength(4)
    @MaxLength(50)
    method: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Role, (roles) => roles.permissions)
    roles: Role
}