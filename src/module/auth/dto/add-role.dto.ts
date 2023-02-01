import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsString, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
export class AddRoleDto {
    @IsString()
    @MaxLength(255)
    @MinLength(6)
    name: string;

    @IsArray()
    @ValidateNested({
        each: true
    })
    @ArrayMinSize(1)
    list_permissions: number;
}
