import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient,) { }


  getPosts(){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/post/getPosts",{headers:header}).pipe(map((res: any) => res ));
  }

  addPost(formData){
    return this.http.post("http://localhost:3000/post/addPost",formData)
    .pipe(map((res: any) => res ));
  }

  addComment(comment){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/post/addComment",comment,{headers:header}).pipe(map((res: any) => res ));
  }

  addReaction(reaction){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/post/addLike",reaction,{headers:header}).pipe(map((res: any) => res ));
  }
  
}
