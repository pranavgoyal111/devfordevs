import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from 'rxjs/operators';

interface response {
  response: string
}

@Injectable({
  providedIn: 'root'
})
export class QueAnsService {

  constructor(private http: HttpClient) {}

   getQuestionsAnswers(){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/QA/getQueAns",{headers:header}).pipe(map((res: any) => res.response ));
   }

   askQuestion(post){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/QA/addQuestion",post,{headers:header})
    .pipe(map((res: any) => res )); 
   }

   addAnswer(post){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/QA/addAnswer",post,{headers:header})
    .pipe(map((res: any) => res )); 
   }

   addReaction(reaction){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/QA/answerLike",reaction,{headers:header})
    .pipe(map((res: any) => res )); 
   }



   
}
