import { IsNotEmpty, MaxLength, MinLength, IsString, IsArray, IsInt } from 'class-validator';
import { Type, Transform } from 'class-transformer';
export class CreateRoleDto {
    @IsString()
    @MaxLength(255)
    @MinLength(6)
    name: string;

    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    list_permissions: number[];
}
