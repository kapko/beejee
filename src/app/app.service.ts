import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PostDataInterface } from './app.interface';
import 'rxjs';

@Injectable()
export class AppService{
  postURL: string = 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=kapar';
  getURL: string = 'https://uxcandy.com/~shapoval/test-task-backend/?developer=kapar';
  constructor(private http: Http) { }

  postData(data: Object): Observable<any> {
    return this.http.post(this.postURL, data);
  }

  getPosts(url: string = ''): Observable<any> {
    return this.http.get(this.getURL + url).map(items => items.json())
  }

}
