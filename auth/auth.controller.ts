import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { id: number, password: string }){
        const user = await this.authService.validateUser(body.id, body.password);
        return this.authService.login(user);
    }

    @Get('test')
    test(){
        return { message: "test" }
    }

}