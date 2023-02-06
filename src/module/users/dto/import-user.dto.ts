import { IsEmail, IsString, MinLength, MaxLength, IsEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class ImportUserDto {
    @IsString()
    name: string;
}
