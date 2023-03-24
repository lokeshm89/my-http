import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Post} from "./post.model";
import {PostService} from "./post.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedPosts :Post[] = [];
  //using indicator
error =null
  constructor(private http: HttpClient, private postsService :PostService) {}

  ngOnInit() {

    this.postsService.fetchPost().subscribe(posts=>{
      this.loadedPosts=posts;
    },error => {
      this.error = error.message;
    });;
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
this.postsService.createStorePost(postData.title,postData.content);
  }

  onFetchPosts() {
    //subscribing to the observer from the service to the component

    this.postsService.fetchPost().subscribe(posts=>{
      this.loadedPosts=posts;
    },error => {
      this.error = error.message;
    });
  }

  onClearPosts() {
    // subscribing to the observer from the service to the component
    this.postsService.deletePost().subscribe(()=>{
      this.loadedPosts = [];
    })
  }
  onError(){
  this.error=null;
  }
}
