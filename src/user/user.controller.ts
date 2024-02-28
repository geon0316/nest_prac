import { Controller, Get, Res, Post, Render } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    // 생성자 
    // private로 선언 했기 때문에 필드 선언 자동으로 됨
    constructor(private userService: UserService){}

    // 유저가 /login 으로 접속 했을 때 로그인 화면을 보여주기 위한 페이지
    @Get('/login')
    @Render('login')
    getLoginPage() {
        
        return {name: "배건형"};
      }

    // 아직 미구현!
    @Post('/signup')
    get(){
        return arguments;
    }

    @Post('/login')
    @Render('success')
    login(){

        return {name: "성공"};
        
    }

    // 모든 유저의 정보를 가져옴
    @Get()
    getAllUser(){
        return this.userService.getAllUserInfo();
    }
}
