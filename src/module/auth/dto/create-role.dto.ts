import { IsNotEmpty, MaxLength, MinLength, IsString, IsArray, IsInt, Validate } from 'class-validator';
// import { IsUnique } from '@youba/nestjs-dbvalidator';
import { Unique } from 'src/decorator/unique.decarotor';
import { Type, Transform } from 'class-transformer';
import { Role } from '../entities/role.entity';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255, {
        message: 'Độ dài không vượt quá 255 ký tự'
    })
    @MinLength(6)
    @Validate(Unique, 
        [ { table: "roles", column: "name", message: 'Name đã tồn tại' }] )
    name: string
    
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    list_permissions: number[];
}
