import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { usertypes } from "src/enums/usertypes.enum";

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

    @ApiProperty({ example: 'speaker' })
    @IsString()
    @IsEnum(usertypes, {
        message: 'type must be participant, speaker or organizer',
    })
    type: usertypes;

    @ApiProperty({ example: '2021-12-05' })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    data_inscricao?: Date;

    @ApiProperty({ example: 'lattes.link.br' })
    @IsOptional()
    @IsString()
    curricul_lattes?: string;

    @ApiProperty({ example: 'adm' })
    @IsOptional()
    @IsString()
    nivel_acesso?: string;
}
