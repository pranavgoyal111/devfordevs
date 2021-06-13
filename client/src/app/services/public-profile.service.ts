import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicProfileService {

  constructor(private http: HttpClient) { }

  getProfile(id) {
    const data = {
      id: id
    }
    let Header = new HttpHeaders();
    Header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/profile/getProfile', data, { headers: Header })
      .pipe(map((res: any) => res));
  }

  getPosts(id){
    const data = {
      id: id
    }
    let Header = new HttpHeaders();
    Header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/profile/getownPosts', data, { headers: Header })
      .pipe(map((res: any) => res));
  }

  getQuestions(id){
    const data = {
      id: id
    }
    let Header = new HttpHeaders();
    Header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/profile/getownQueAns', data, { headers: Header })
      .pipe(map((res: any) => res));
  }
}
