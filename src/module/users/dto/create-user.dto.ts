import { IsEmail, IsString, MinLength, MaxLength, IsEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto {
    @IsString()
    @MaxLength(255)
    @MinLength(6)
    name: string;

    @IsEmail()
    @MaxLength(255)
    @MinLength(6)
    email: string;

    @IsString()
    @MaxLength(255)
    @MinLength(6)
    password: string;

    @IsNumber()
    @Type(() => Number)
    roleId: number

    @IsString()
    @MaxLength(255)
    guard: string;
}
