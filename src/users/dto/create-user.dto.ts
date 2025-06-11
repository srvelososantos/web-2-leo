import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'João da Silva' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'joao@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'senha123' })
    @IsString()
    @MinLength(6)
    password: string;
}
