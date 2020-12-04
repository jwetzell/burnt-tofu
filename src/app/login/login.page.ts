import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserService, WanikaniTokenService } from 'wanikani-api-ng';
import { AppState } from '../state';
import { setUserData } from '../state/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  apiToken = '';

  constructor(private store: Store<AppState>, private userService: UserService, private tokenService: WanikaniTokenService) { }

  ngOnInit() {
  }

  login(){
    this.tokenService.setApiToken(this.apiToken);

    this.userService.getUser().pipe(
      take(1),
    ).subscribe(user => this.store.dispatch(setUserData({user})));
  }

}
