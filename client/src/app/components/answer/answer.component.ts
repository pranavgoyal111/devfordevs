import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { QueAnsService } from "../../services/que-ans.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { QueAnsComponent } from "../que-ans/que-ans.component";


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  user:any;
  totalLike:Number;
  totalDisLike:Number;
  likeStatus: boolean;
  dislikeStatus:boolean;
  questionsAnswers:any;

  @Input() public answer;

  @Output() public newUpdateData = new EventEmitter();


  constructor( 
    private _AuthService: AuthService, 
    private _QueAnsService:QueAnsService,
    private _flashMessagesService: FlashMessagesService,
    private _QueAnsComponent: QueAnsComponent
    ) { 
    this.user= this._AuthService.getUserData();
    this.user = JSON.parse(this.user);
  }

  ngOnInit(): void {
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
    //   console.log(res)
    //   this.questionsAnswers = res
    // }, err => {
    //   console.log(err);
    //   return false;
    // })
    // // send data to parent
    // this.newUpdateData.emit(this.questionsAnswers);

     

    this._QueAnsService.addReaction(userLike).subscribe( res =>{
      if(res.success){
        this._QueAnsComponent.setQuesAns();
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
        this._QueAnsComponent.setQuesAns();
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      }else{
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }
    })



  }

}
