import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    // 회원가입 한 회원 정보를 담음
    private profileInfo = [];

    public getAllUserInfo(){
        return this.profileInfo;
    }
}
