import { Injectable } from '@nestjs/common';
import { UserInfo } from 'os';
import { UserInformation } from './user.model';
import {v1 as uuid} from 'uuid';
import { userInfoDto} from './dto/create-user.dto';
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
    public createUserInfo(createDto:userInfoDto){
        const userInfo:UserInformation = {
                identif : uuid(),
                id : createDto.userid,
                pw : createDto.userpw
        }

        // 회원가입 전 id가 중복 되는지 검사
        const createFlag =  this.validUserInfo(userInfo.id);

        // 만약 회원가입 Flag가 true라면 (회원정보 중복x)
        if (createFlag === true){
            // 생성한 유저 정보를 저장  
            this.profileInfo.push(userInfo);
        
            // 생성한 유저 정보 리턴
            return userInfo;
        }

        // 만약 회원가입 Flag가 false 라면 (회원정보 중복)
        // 포스트맨에서 중복 처리가 된 경우를 확인하기 위함
        else{
            userInfo.id = "중복";
            // 생성한 유저 정보 리턴
            return userInfo;
        }
    }

    // 로그인 요청 처리를 위한 함수
    public userLogin(loginInfo:userInfoDto):UserInformation{

        // 입력받은 값으로 id가 존재 하는지 검사
        const validIdFlag = this.validUserInfo(loginInfo.userid);

        // 만약 유효한 아이디라면 해당 아이디의 유저 정보를 반환 받아서 요청 받은 PW와 비교
        
        // 만약 요청으로 받은 아이디 정보가 유효 하다면
        if (validIdFlag === false){

            // 회원정보에서 유저 정보를 빼온다
            const user = this.getUserInfo(loginInfo.userid);

            // 비밀번호 일치 여부 조회

            // 비밀번호가 일치한다면
            if (user.pw === loginInfo.userpw){
                return user;
            }

            // 비밀번호가 일치하지 않는다면
            else{
                return undefined;
            }
        }

        // 아이디 정보가 유효하지 않다면
        else{
            return undefined;
        }
    }

    // 유저 정보의 

    // 로그인 진행시 인자로 받는 아이디에 해당하는 유저 정보를 반환
    // ID 값만 받아 검사 진행
    // 조건: 인자로 받는 아이디는 존재하는 아이디이다.
    public getUserInfo(userID:userInfoDto["userid"]):UserInformation{

        // 인자로 받은 ID 입력 값으로 회원 정보 배열에서 정보를 받아서 리턴함.
        const userInfo = this.profileInfo.find(user => user.id === userID);

        return userInfo;
    }

    // 유저 정보 생성전 중복검사
    public validUserInfo(userID:string):boolean{

        // 인자로 입력받은 유저 정보를 회원 정보 배열에 돌려서 존재하는지 검사
        const validFlag = this.profileInfo.find(userObj => userObj.id === userID)
        
        // 만약 회원 배열에 id가 중복되는 정보가 없다면 true 반환
        if (validFlag === undefined){
            return true;
        }

        // 만약 회원 배열에 id가 중복되는 정보가 있다면 false 반환
        else{
            return false;
        }
    } 
}
