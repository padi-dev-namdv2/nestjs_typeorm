import { IsNotEmpty, MaxLength, MinLength, IsString, IsArray, IsInt, Validate } from 'class-validator';
import { IsUnique } from '@youba/nestjs-dbvalidator';
import { Type, Transform } from 'class-transformer';
export class CreateRoleDto {
    @IsString()
    @MaxLength(255, {
        message: 'Độ dài không vượt quá 255 ký tự'
    })
    @MinLength(6)
    @Validate(IsUnique, 
        [ { table: "roles", column: "name", message: 'Email đã tồn tại' }] )
    name: string;

    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    list_permissions: number[];
}
