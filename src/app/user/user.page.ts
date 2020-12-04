import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserData, WanikaniTokenService } from 'wanikani-api-ng';
import { AppState } from '../state';
import { userData } from '../state/user/user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user$: Observable<UserData>

  constructor(
    private tokenService: WanikaniTokenService,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit() {
    this.user$ = this.store.select(userData);
  }

  close(){
    this.router.navigate(['/home']);
  }

  logout(){
    this.tokenService.logout();
  }

}
