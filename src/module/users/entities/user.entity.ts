import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import * as bcrypt from "bcryptjs";

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
    @IsNotEmpty()
    role_id: number;

    @Column()
    @Length(4, 100)
    guard: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}