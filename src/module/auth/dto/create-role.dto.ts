import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class CreateRoleDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    name: string;
}
