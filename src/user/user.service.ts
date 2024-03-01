import { Injectable } from '@nestjs/common';
import { UserInfo } from 'os';
import { UserInformation } from './user.model';

@Injectable()
export class UserService {
    // 회원가입 한 회원 정보를 담음
    private profileInfo:UserInformation[] = [] ;

    // 모든 유저의 정보를 반환
    public getAllUserInfo():UserInformation[] {
        return this.profileInfo;
    }

    // 유저 정보 생성
    public createUserInfo(userId:string, userPW:string){
        const userInfo:UserInformation = {
                id : userId,
                pw : userPW
        }

        this.profileInfo.push(userInfo);
    }
}
