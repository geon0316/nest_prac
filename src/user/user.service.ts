import { Injectable } from '@nestjs/common';
import { UserInfo } from 'os';
import { UserInformation } from './user.model';
import {v1 as uuid} from 'uuid';
import { createUserDto } from './dto/create-user.dto';

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

        // 생성한 유저 정보를 저장
        this.profileInfo.push(userInfo);
        
        // 생성한 유저 정보 리턴
        return userInfo;
    }
}
