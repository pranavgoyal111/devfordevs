import { OwnPostsComponent } from './components/own-posts/own-posts.component';
import { QuestionComponent } from './components/question/question.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { OwnQuesAnsComponent } from './components/profile/own-ques-ans/own-ques-ans.component';
import { OwnpostComponent } from './components/profile/ownpost/ownpost.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { DevelopersComponent } from './components/developers/developers.component';
import { QueAnsComponent } from './components/que-ans/que-ans.component';
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component"
import { UnknownComponent } from "./components/unknown/unknown.component";
import { ProfileComponent } from "./components/profile/profile.component";


import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "developers", component: DevelopersComponent, canActivate: [AuthGuard] },
  { path: "QueAns", component: QueAnsComponent, canActivate: [AuthGuard] },
  {
    path: "profile", component: ProfileComponent, canActivate: [AuthGuard],
    children: [
      { path: "ownPost", component: OwnpostComponent, canActivate: [AuthGuard] },
      { path: "ownQuesAns", component: OwnQuesAnsComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'developer-profile/:id', component: ViewProfileComponent,
    children: [
      { path: "developer-questions-answers",component:QuestionComponent},
      { path: "developer-posts",component:OwnPostsComponent}
    ]
  },
  { path: "**", component: UnknownComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
