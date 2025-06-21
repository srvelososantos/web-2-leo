import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { id: number, password: string }){
        const user = await this.authService.validateUser(body.id, body.password);
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Req() req: any){
        return this.authService.me(req)
    }

}