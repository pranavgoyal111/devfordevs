import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';

// Services
import { QueAnsService } from "../../services/que-ans.service";

@Component({
  selector: 'app-que-ans',
  templateUrl: './que-ans.component.html',
  styleUrls: ['./que-ans.component.css']
})
export class QueAnsComponent implements OnInit {
  questions: any[] = [];
  question: String;
  description: String;
  tags: any = [];
  user: any;

  public reactionUpdate;


  constructor(
    private _QueAnsService: QueAnsService,
    private _AuthService: AuthService,
    private _flashMessagesService: FlashMessagesService,
  ) {
    this.user = this._AuthService.getUserData();
    this.user = JSON.parse(this.user);

    // Get all questions and answers
    this._QueAnsService.getQuestionsAnswers().subscribe(res => {
     
      this.questions = res
    }, err => {
      console.log(err);
      return false;
    })
   }

  ngOnInit():void {
  }
 
  // set in ques anns
  public setQuesAns(){
      // Get all questions and answers
    this._QueAnsService.getQuestionsAnswers().subscribe(res => {
     
      this.questions = res
    }, err => {
      console.log(err);
      return false;
    })
  }

  // send child data in parent
  setInParent(res){
   
  }

  // claculate date diffrence
  calculateDiff(data) {

    let date = new Date(data);
    let currentDate = new Date();

    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  onSelect(event) {

  }
  onEnter(event) {
   
  }

  askQuestion() {
    this.user = this._AuthService.getUserData();
    this.user = JSON.parse(this.user);

    const question = {
      authorName: this.user.name,
      authorDesignation: this.user.designation,
      authorPicture: this.user.dp,
      authorId: this.user.id,
      question: this.question,
      description: this.description,
      tags: this.tags
    }

    this._QueAnsService.askQuestion(question).subscribe(res => {
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




}
