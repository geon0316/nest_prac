import { Controller, Get, Res, Post, Render, Body } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';
import { UserService } from './user.service';
import { UserInformation } from './user.model';
import { createUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    // 생성자 
    // private로 선언 했기 때문에 필드 선언 자동으로 됨
    constructor(private userService: UserService){}



    // 모든 유저의 정보를 가져옴
    @Get('all')
    getAllUser():UserInformation[]{
        return this.userService.getAllUserInfo();
    }

    // 유저 정보 생성
    // 클라이언트 요청을 받을 때 Body의 userid, userpw 정보를 가져와 인자로 전달함
    @Post('create')
    createUserInfo(@Body() createDto:createUserDto){

        // 서비스의 유저 생성 함수 호출
        return this.userService.createUserInfo(createDto);
    }



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




    

}
