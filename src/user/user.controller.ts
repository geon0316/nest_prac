import { Controller, Get, Res, Post } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';

@Controller('user')
export class UserController {

    // 유저가 /login 으로 접속 했을 때 로그인 화면을 보여주기 위한 페이지
    @Get('/login')
    getLoginPage(@Res() res: Response) {
        return '로그인 진입';
        res.sendFile(path.join(__dirname,'login.html'));
      }

    // 아직 미구현!
    @Post('/signup')
    get(){
        return arguments;
    }
}
