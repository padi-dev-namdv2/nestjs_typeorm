import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import * as bcrypt from "bcryptjs";
import { User } from "../../users/entities/user.entity";
import { Permission } from "./permission.entity";

@Entity('roles')
export class Role {
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
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => User, (users) => users.role)
    users: User

    @ManyToMany(() => Permission, (permissions) => permissions.roles)
    @JoinTable(
        {
            name: 'rolepermissions',
            joinColumn: {
              name: 'roleId',
              referencedColumnName: 'id',
            },
            inverseJoinColumn: {
              name: 'permissionId',
              referencedColumnName: 'id',
            }
        }
    )
    permissions: Permission[]
}