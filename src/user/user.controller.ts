import { Controller, Get, Res, Post, Render, Body } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';
import { UserService } from './user.service';
import { UserInformation } from './user.model';
import { userInfoDto} from './dto/create-user.dto';

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
    @Post('/create')
    createUserInfo(@Body() createDto:userInfoDto){

        // 서비스의 유저 생성 함수 호출
        return this.userService.createUserInfo(createDto);
    }

    // 유저 로그인
    @Post('/login')
    userLogin(@Body() loginInfo:userInfoDto):UserInformation{

        // 입력 받은 정보로 id, pw 유효 여부 진행
        // ID 가 잘못 됐는지, pw가 잘못 됐는지 따로 알려주지 않는다.

        // 로그인 함수 호출
        // ID, PW 가 일치하면 UserInformation 타입 객체 반환, 아니면 undefinded 반환
        const user = this.userService.userLogin(loginInfo);

        // 일치하지 않는다면
        if (user === undefined){
            return undefined;
        }

        // 일치한다면
        else{
            return user;
        }
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

    @Post('/logins')    // 원래 /login 인데 다른 항목 테스트 때문에 logins로 바꿈
    @Render('success')
    login(){

        return {name: "성공"};
        
    }




    

}
