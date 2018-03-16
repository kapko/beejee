import {Component} from '@angular/core';
@Component({
  selector: 'app',
  template: `
    <form  *ngIf="!showApp">
      <div class="ui input">
        <input type="text" placeholder="login" [(ngModel)]="login" name="log"/>
      </div>
      <div class="ui input">
        <input type="password" placeholder="password" [(ngModel)]="pass" name="pass"/>
      </div>
      <button class="ui primary button" (click)="sendData(login, pass)">submit</button>
      <button class="ui button" (click)="loginAsUser()">login as user</button>
    </form>
    <app-home *ngIf="showApp"></app-home>
  `,
})
export class AppComponent {
  showApp: boolean = false;
  constructor(
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('auth')) {
      this.showApp = true;
    }
  }

  sendData(login: string, pass: string): void {
    if (login === 'admin' && pass === '123') {
      this.showApp = true;
      localStorage.setItem('auth', 'admin');
    } else {
      alert('pls re-enter login and password');
    }
  }

  loginAsUser(): void {
    localStorage.setItem('auth', 'user');
    this.showApp = true;
  }

}