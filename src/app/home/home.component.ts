import {Component} from '@angular/core';
import { Post } from '../app.interface';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  posts: Post[] = [];

  constructor(
    private appService: AppService
  ){
    this.appService.getPosts('&sort_field=status')
      .subscribe(items => {
        console.log(items);
        let data = items.message;
        this.posts = data.tasks;
      })
  }
}
