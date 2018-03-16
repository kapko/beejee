import {Component} from '@angular/core';
import { Post } from '../app.interface';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  posts: Post[] = [];
  user:boolean = true;
  id:boolean = true;
  email:boolean = true;
  status:boolean = true;
  showActions:boolean = false;
  pages: any = [];

  showForm: boolean = false;

  sort_field: string = 'name';
  sort_direction: string = 'asc';
  page: number = 1;
  editPostData: Post = null;

  constructor(
    private appService: AppService
  ){
    this.getAllPosts();
  }

  ngOnInit(): void {
    if (localStorage.getItem('auth') === 'admin') {
      this.showActions = true;
    }
  }

  sortData(field: string, sort: boolean): void {
    this.sort_direction = (sort) ? 'asc' : 'desc';
    this.sort_field = field;

    this.getAllPosts();
  }

  getAllPosts(): void {
    let url = `&sort_field=${this.sort_field}&sort_direction=${this.sort_direction}&page=${this.page}`

    this.appService.getPosts(url)
      .subscribe(items => {
        let data = items.message;
        this.posts = data.tasks;
        this.pagination(data.total_task_count)
      });
  }

  pagination(count): void {
    this.pages = [];
    for (let i = 0; i <= count; i += 3) {
      this.pages.push(i);
    }
  }
  
  pagePagination(page: number): void {
    this.page = page;
    this.getAllPosts();
  }

  logout(): void {
    localStorage.removeItem('auth');
    location.reload();
  }

}
