import { Component, OnInit } from '@angular/core';
import { UserService, UserData } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  userObs: Observable<UserData>
  constructor(private userService:UserService) {}

  ngOnInit(){
    this.userObs = this.userService.getUser().pipe(
      map(user=>user.data)
    )
  }

}
