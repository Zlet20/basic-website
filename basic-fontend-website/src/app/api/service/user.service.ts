import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {  UserRp, LoginRequest, LoginResponse, UserRegister } from "../model/user.model";
import { HttpClient } from '@angular/common/http';
import { Response } from '../model/common.model';
import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _apiMyProfile = `${environment.api}users/me`
    private _apiLogin = `${environment.api}auth/login`;
    private _apiRegister = `${environment.api}auth/register`;


    private _$displayName: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly $displayName: Observable<string> = this._$displayName.asObservable();
  private _$isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly $isLogin: Observable<boolean> = this._$isLogin.asObservable();
  private _$userCurrent: BehaviorSubject<UserRp> = new BehaviorSubject(new UserRp());
  public readonly $userCurrent: Observable<UserRp> = this._$userCurrent.asObservable();

  constructor(protected httpClient: HttpClient) { 
    this._getDisplayName();
    this.getTokenRemainingTime();
    this.$displayName.subscribe(displayName => {
      this._$isLogin.next('' != displayName );
    });
  }


  public setJWT(jwt: string, displayName: string): void{
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('displayName', displayName);
    this._getDisplayName();
  }

  private _getDisplayName(): void {
    let displayName = localStorage.getItem('displayName');
    
    if(!this.getTokenRemainingTime()){
      localStorage.setItem('displayName', '');
      this._$displayName.next('');
    }

    if('' != displayName && displayName != null && displayName != undefined) { 
      this._$displayName.next(displayName);
    }
   
  }

  private _getDecodedJwt(jwt: string): {username: string, displayName: string, exp: number} | null {
    try {
      return jwt_decode(jwt);
    } catch (Error) {
      return null;
    }
  }

  getTokenRemainingTime(): boolean {
    let jwt = localStorage.getItem('jwt');
    if(jwt != null && jwt != undefined) {
      let exp = this._getDecodedJwt(jwt)?.exp;
      if(exp != null){
        let expires = new Date(exp*1000);
        return (expires.getTime() - Date.now()) > 0;
      }
    }
    return false;
  }

  getJWT(): string{
    let jwt = localStorage.getItem('jwt');
    return jwt  == null ? '' : jwt ;
  }
  public logout(): void{
    localStorage.setItem('jwt', '');
    this._$userCurrent.next(null);
  }

  public setUserCurrent(user: UserRp): void{
    this._$userCurrent.next(user);
  }
  getMyProfile(): Observable<Response<UserRp>>{
    return this.httpClient.get<Response<UserRp>>(this._apiMyProfile);
}

  
  createUser(user: UserRegister): Observable<Response<UserRp>>{

    return this.httpClient.post<Response<UserRp>>(this._apiRegister, user);

}

login(rq: LoginRequest): Observable<Response<LoginResponse>>{
    return this.httpClient.post<Response<LoginResponse>>(this._apiLogin, rq);

}   

}

