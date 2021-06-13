import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import * as _ from 'lodash';
import { PostService } from "../../services/post.service"
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;

  user: any;

  description: any;
  tags: any = [];
  fileToUpload: File = null;

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  // reaction 
  nothing_reaction: any = "<i class='fa fa-thumbs-o-up mr-2'></i>Like";
  like_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/like.gif?raw=true' width='30px' class='mr-1'>Like";
  superb_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/superb.gif?raw=true' width='30px' class='mr-1'>Superb";
  love_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/love.gif?raw=true' width='30px' class='mr-1'>Love";
  curious_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/curious.gif?raw=true' width='30px' class='mr-1'>Curious";
  cry_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/cry.gif?raw=true' width='30px' class='mr-1'>Cry";
  sad_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/sad.gif?raw=true' width='30px' class='mr-1'>Sad";
  angry_reaction: any = "<img src='https://github.com/Sourav59580/facebook_reaction/blob/main/devfordevs%20rection/angry.gif?raw=true' width='30px' class='mr-1'>Angry";


  constructor(
    private titleService: Title,
    private _PostService: PostService,
    private http: HttpClient,
    private _AuthService: AuthService,
    private _flashMessagesService: FlashMessagesService,
  ) {
    this.titleService.setTitle("DEVFORDEVS");
    this.user = this._AuthService.getUserData();
    this.user = JSON.parse(this.user);

    //get all posts
    this._PostService.getPosts().subscribe(res => {

      this.posts = res.response;
    }, err => {
      console.log(err);
      return false;
    })



  }

  ngOnInit(): void {
  }

  searchId(likes){
    for(var i=0;i<likes.length;i++){
      if(likes[i].liked_by==this.user.id)
      {
        return this.checkReaction(likes[i].reaction);
      }
    }
    return this.nothing_reaction
  }

  // check reaction
  checkReaction(reaction) {
    if (reaction == 'nothing' || reaction == '')
      return this.nothing_reaction;
    else if (reaction == 'like')
      return this.like_reaction;
    else if (reaction == 'superb')
      return this.superb_reaction;
    else if (reaction == "love")
      return this.love_reaction;
    else if (reaction == "curious")
      return this.curious_reaction;
    else if (reaction == "cry")
      return this.cry_reaction;
    else if (reaction == 'sad')
      return this.sad_reaction;
    else if (reaction == 'angry')
      return this.angry_reaction;
    else
      return this.nothing_reaction;
  }

  // claculate date diffrence
  calculateDiff(d) {
    let date = new Date(d);
    let currentDate = new Date();
    
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  // Like a post
  like(reaction,postId) {
    const userReaction = {
      postId: postId,
      liked_by: this.user.id,
      name: this.user.name,
      reaction: reaction
    }
  
    this._PostService.addReaction(userReaction).subscribe(res=>{

      if (res.success) {
        //get all posts
        this._PostService.getPosts().subscribe(res => {
        
          this.posts = res.response;
        }, err => {
          console.log(err);
          return false;
        })
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      } else {
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }

    })
  }

  // write a comment
  writeComment(postId, comment) {
    const userComment = {
      postId: postId,
      commentator_id: this.user.id,
      commentator_name: this.user.name,
      commentator_dp: this.user.dp,
      commentator_designation: this.user.designation,
      comment: comment
    }

    this._PostService.addComment(userComment).subscribe(res => {

      if (res.success) {
        //get all posts
        this._PostService.getPosts().subscribe(res => {
         
          this.posts = res.response;
        }, err => {
          console.log(err);
          return false;
        })
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      } else {
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }


    })
  }

  // Start a post
  startAPost() {
    const formData = new FormData();
    formData.append("authorId", this.user.id);
    formData.append("authorDP", this.user.dp);
    formData.append("authorName", this.user.name);
    formData.append("authorDesignation", this.user.designation);
    formData.append("content", this.description);
    formData.append("tags", this.tags);
    formData.append("file", this.fileToUpload, this.fileToUpload.name);
   
    this._PostService.addPost(formData).subscribe(res => {
      if (res.success) {
        //get all posts
        this._PostService.getPosts().subscribe(res => {
         
          this.posts = res.response;
        }, err => {
          console.log(err);
          return false;
        })
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-success' });
      } else {
        this._flashMessagesService.show(res.msg, { cssClass: 'alert-danger' });
      }
    })
    // this.http.post("http://localhost:3000/post/addPost",formData).subscribe((res) => {
    //    

    //   }, (err) =>{
    //     console.log(err)
    //   } 
    // )

  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      this.fileToUpload = fileInput.target.files[0];

      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg', 'image/gif', 'image/svg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

}
