import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    @MaxLength(255)
    @MinLength(6)
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    password: string;
}
