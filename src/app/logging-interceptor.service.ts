import {Injectable} from '@angular/core';
import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Outgoing Request');
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req).pipe(tap(events=>{
      if(events.type === HttpEventType.Response)
      {
        console.log('Incomming Response');
        console.log(events.body);
      }
    }));
  }
}
