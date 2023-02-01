import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import { Length, IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Permission } from "./permission.entity";
import { IsInt, validateOrReject } from "class-validator";

@Entity('rolepermissions')
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsInt()
    roleId: number;

    @Column()
    @IsInt()
    permissionId: number

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
    await validateOrReject(this);
  }
}