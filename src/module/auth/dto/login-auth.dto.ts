import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class LoginAuthDto {
    @IsEmail()
    @MaxLength(255)
    @MinLength(6)
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    password: string;
}
