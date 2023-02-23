import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsString, IsArray, ValidateNested, ArrayMinSize, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../entities/role.entity';
import { IsUnique } from '@youba/nestjs-dbvalidator';

export class AddRoleDto {
    @IsString()
    @MaxLength(255)
    @MinLength(6)
    @Validate(IsUnique, 
    [ { table: Role, column: "name" }] )
    name: string;

    @IsArray()
    @ValidateNested({
        each: true
    })
    @ArrayMinSize(1)
    list_permissions: number;
}
