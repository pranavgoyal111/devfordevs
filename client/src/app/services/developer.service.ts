import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient) { }

  getAllDevelopers(){
    return this.http.get('http://localhost:3000/developers/getAll')
    .pipe(map((res: any) => res ));
  }

  getAllFollowings(id){
    const data = {
      id: id
    }

    let Header = new HttpHeaders();
    Header.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/developers/getAllFollowings',data,{headers:Header})
    .pipe(map((res: any) => res ));

  }

  following(data){
    let Header = new HttpHeaders();
    Header.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/developers/follow',data,{headers:Header})
    .pipe(map((res: any) => res ));
  }

  unfollowing(data){
    let Header = new HttpHeaders();
    Header.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/developers/followRemove',data,{headers:Header})
    .pipe(map((res: any) => res ));
  }
}
