import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private _flashMessagesService: FlashMessagesService, 
    private _AuthService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    const loginUser = {
      email: this.email,
      password: this.password
    }

    this._AuthService.loginUser(loginUser).subscribe(data => {
      if(data.success){
        this._AuthService.storeUserData(data.token,data.user);
        this._flashMessagesService.show("You are now logged in.",{ cssClass: 'alert-success' });
        this._router.navigate(['/']);
      }else{
        this._flashMessagesService.show(data.msg,{ cssClass: 'alert-danger' });
        this._router.navigate(['/login']);
      }
    })

  }

}
