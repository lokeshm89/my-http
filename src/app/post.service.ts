import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  //using subject  class for error handeling
error = new Subject<string>();
  constructor(private http :HttpClient) { }
  createStorePost(title:string,content:string){
    const postData:Post = {title:title,content:content}
    this.http.post('https://http-practice-f8fa7-default-rtdb.firebaseio.com/posts.json',postData)
      .subscribe(res=>{
        console.log(res)
      },error=>{
        this.error.next(error.message);
      });
  }
  fetchPost(){
    //adding multiple params
    // const searchParams = new HttpParams();
    // searchParams.append('sheri','taj');
    //returning this to the component to subscribe over there
    return this.http.get<{[key:string]:Post}>('https://http-practice-f8fa7-default-rtdb.firebaseio.com/posts.json',
      {
      //adding headers to the http request
      headers:new HttpHeaders({'Custom-Header': 'Hello'}),
        params: new HttpParams().append('sheri','taj').set('taj','sheri').delete('sheri','taj')
      }
    )
      //using pipe operator to transform response data , in pipe we use map operator
      //using type with http with get method
      .pipe(map(resData=>{
        //creating new array by manually looping through values
        const postArray : Post[] = [];
        for(const key in resData){
          if(resData.hasOwnProperty(key)) {
            postArray.push(resData[key])
          }
        }
        return postArray;
      } ))
  }
  deletePost(){
    return this.http.delete('https://http-practice-f8fa7-default-rtdb.firebaseio.com/posts.json');
  }
}
