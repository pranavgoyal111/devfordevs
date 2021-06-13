import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QueAnsService } from "../../../services/que-ans.service";
import { PublicProfileService } from "../../../services/public-profile.service";

@Component({
  selector: 'app-own-ques-ans',
  templateUrl: './own-ques-ans.component.html',
  styleUrls: ['./own-ques-ans.component.css']
})
export class OwnQuesAnsComponent implements OnInit {

  questions: any[] = [];
  question: String;
  description: String;
  tags: any = [];
  user: any;
  id: any;

  public reactionUpdate;

  totalLike:Number;
  totalDisLike:Number;
  likeStatus: boolean;
  dislikeStatus:boolean;
  questionsAnswers:any;

  constructor(
    private _QueAnsService: QueAnsService,
    private _AuthService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private _PublicProfileService: PublicProfileService,
  ) { 
    this.user = this._AuthService.getUserData();
    this.user = JSON.parse(this.user);
    this.id = this.user.id;
  }

  ngOnInit(): void {
    this._PublicProfileService.getQuestions(this.id).subscribe(res=>{
    
      this.questions = res.data;
    },err=>{
      console.log(err);
      return false;
    })
  }

   // claculate date diffrence
   calculateDiff(data) {

    let date = new Date(data);
    let currentDate = new Date();

    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  // send answer
  sendAnswer(id,ans){
    this.user = this._AuthService.getUserData();
    this.user = JSON.parse(this.user);
    const answer = {
      questionId:id,
      userName: this.user.name,
      userDesignation: this.user.designation,
      userPicture: this.user.dp,
      answer: ans
    }

    this._QueAnsService.addAnswer(answer).subscribe(res => {
      if (res.success) {
        // Get all questions and answers
        this._QueAnsService.getQuestionsAnswers().subscribe(res => {
          
          this.questions = res
        }, err => {
          console.log(err);
          return false;
        })
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      }else{
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }
    })
  }

  searchDislike(mem):boolean{
    for(var i=0;i<mem.length;i++)
    {
      if(mem[i]==this.user.id)
      return true;
    }
    return false;
  }

  searchLike(mem):boolean{

    for(var i=0;i<mem.length;i++)
    {
      if(mem[i]==this.user.id)
      {
        return true; 
      }
    }
    return false;
  }

  calculateLike(like){
    this.totalLike=like;
    return this.totalLike;
  }

  calculateDislike(dislike){
    this.totalDisLike=dislike;
    return this.totalDisLike;
  }

  like(answerId) {

    const userLike = {
      answer_id: answerId,
      reaction_by: this.user.id,
      reaction: "like"
    }

    // // Get all questions and answers
    // this._QueAnsService.getQuestionsAnswers().subscribe(res => {

    //   this.questionsAnswers = res
    // }, err => {
    //   console.log(err);
    //   return false;
    // })
    // // send data to parent
    // this.newUpdateData.emit(this.questionsAnswers);

     

    this._QueAnsService.addReaction(userLike).subscribe( res =>{
      if(res.success){
        this.setQuesAns();
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      }else{
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }
    })
  }

  
  dislike(answerId){

    const userDislike = {
      answer_id: answerId,
      reaction_by: this.user.id,
      reaction: "dislike"
    }

    this._QueAnsService.addReaction(userDislike).subscribe(res=>{
      if(res.success){
        this.setQuesAns();
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      }else{
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }
    })
  }

  setQuesAns(){
    this._PublicProfileService.getQuestions(this.id).subscribe(res=>{
     
      this.questions = res.data;
    },err=>{
      console.log(err);
      return false;
    })
  }

}
