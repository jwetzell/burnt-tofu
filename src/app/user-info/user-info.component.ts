import { Component, OnInit } from '@angular/core';
import { UserService, UserData } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  user: Observable<UserData>;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser().pipe(
      map(user=>user.data)
    )
  }

}
