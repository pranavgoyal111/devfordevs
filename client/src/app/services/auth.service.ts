import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient,public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem("id_token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  // Get User Data
  getUserData(){
    const loginUser = localStorage.getItem("user");
    return loginUser;    
  }
  
  // Register
  registerUser(user){
    let Header = new HttpHeaders();
    Header.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/auth/register',user,{headers:Header})
    .pipe(map((res: any) => res )); 
  }

  //Login
  loginUser(user){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/auth/authenticate",user,{headers:header})
    .pipe(map((res: any ) => res));
  }

  // Store user
  storeUserData(token, user){
    localStorage.setItem("id_token",token);
    localStorage.setItem("user",JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user= null;
    localStorage.clear();
  }

}
