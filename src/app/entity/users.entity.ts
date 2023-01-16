import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(4, {
        message: 'Username is too short',
    })
    @MaxLength(50, {
        message: 'Username is too long',
    })
    username: string;

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
    @IsNotEmpty()
    role_id: number;

    @Column()
    @IsNotEmpty()
    status: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @UpdateDateColumn()
    deletedAt: Date;

    @Column()
    @IsNotEmpty()
    rolesId: number;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}