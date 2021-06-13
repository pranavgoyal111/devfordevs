import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'

import { ProfileRoutingModule } from './profile-routing.module';
import { OwnQuesAnsComponent } from './own-ques-ans/own-ques-ans.component';
import { OwnpostComponent } from "./ownpost/ownpost.component";


@NgModule({
  declarations: [
    OwnQuesAnsComponent,
    OwnpostComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    BrowserModule,
  ]
})
export class ProfileModule { }
