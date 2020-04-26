import { Component, OnInit } from '@angular/core';
import { UserService, UserData, WanikaniTokenService, WaniSubscription, Preferences } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private userService: UserService, private tokenService:WanikaniTokenService, private router: Router) { }
  
  user: Observable<UserData>
  subscription: Observable<WaniSubscription>
  preferences: Observable<Preferences>

  ngOnInit() {
    this.user = this.userService.getUser().pipe(map(user => user.data));
  }
  
  close(){
    this.router.navigate(['/home']);
  }

  logout(){
    this.tokenService.logout();
  }

}
