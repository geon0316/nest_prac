import { Injectable } from '@nestjs/common';
import { UserInfo } from 'os';
import { UserInformation } from './user.model';
import {v1 as uuid} from 'uuid';
import { createUserDto } from './dto/create-user.dto';
import { retry } from 'rxjs';
import e from 'express';

@Injectable()
export class UserService {
    // 회원가입 한 회원 정보를 담음
    private profileInfo:UserInformation[] = [] ;

    // 모든 유저의 정보를 반환
    public getAllUserInfo():UserInformation[] {
        return this.profileInfo;
    }

    // 유저 정보 생성
    public createUserInfo(createDto:createUserDto){
        const userInfo:UserInformation = {
                identif : uuid(),
                id : createDto.userid,
                pw : createDto.userpw
        }

        // 회원가입 전 id가 중복 되는지 검사
        const createFlag =  this.validUserInfo(userInfo);

        // 만약 회원가입 Flag가 true라면 (회원정보 중복x)
        if (createFlag === true){
            // 생성한 유저 정보를 저장
            this.profileInfo.push(userInfo);
        
            // 생성한 유저 정보 리턴
            return userInfo;
        }

        // 만약 회원가입 Flag가 false 라면 (회원정보 중복)
        else{
            userInfo.id = "중복";
            // 생성한 유저 정보 리턴
            return userInfo;
        }
    }

    // 유저 정보 생성전 중복검사
    public validUserInfo(userInfo:UserInformation):boolean{

        // 인자로 입력받은 유저 정보를 회원 정보 배열에 돌려서 존재하는지 검사
        const validFlag = this.profileInfo.find(userObj => userObj.id === userInfo.id)
        
        // 만약 회원 배열에 id가 중복되는 정보가 있다면 false 반환
        if (validFlag === undefined){
            return true;
        }

        // 만약 회원 배열에 id가 중복되는 정보가 있다면 false 반환
        else{
            return false;
        }
    } 
}
