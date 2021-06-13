import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {ToastService} from 'ng-uikit-pro-standard'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  password: String;
  designation: String;
  companyORinstitute: String;
  githubLink: String;
  linkedinLink: String;
  googleLink: String;

  options = { extendedTimeOut: 30000, positionClass: 'md-toast-bottom-left',class: 'pink' };

  constructor(
    private _AuthService:AuthService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
    ) { 
      
    }

  ngOnInit() {
  }

  showInfo(){
    this._flashMessagesService.show("Something went wrong!!",{ cssClass: 'alert-danger' });
  }

  

  onRegister() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      designation: this.designation,
      companyORinstitute: this.companyORinstitute,
      githubLink: this.githubLink,
      linkedinLink: this.linkedinLink,
      googleLink: this.googleLink
    }

    // Register
    this._AuthService.registerUser(user).subscribe(data =>{
      if(data.success){
        this._flashMessagesService.show("You are registered and can log in",{ cssClass: 'alert-success' });
        this._router.navigate(['/login']);
      }else{
        this._flashMessagesService.show("Something went wrong!!",{ cssClass: 'alert-danger' });
        this._router.navigate(['/register']);
      }
    })

    
  }

}
