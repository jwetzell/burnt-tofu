import { Component, OnInit } from '@angular/core';
import { UserService, UserData, WanikaniTokenService } from 'wanikani-api-ng';
import { Observable, iif, EMPTY } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  user: Observable<UserData>;

  constructor(private userService:UserService, private tokenService: WanikaniTokenService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.user = this.tokenService.getIsAuthenticated().pipe(
      mergeMap(auth=>iif(
        ()=>auth,
        this.userService.getUser().pipe(
          map(user=>user.data)
        ),
        EMPTY))
    )
  }

  logout(){
    this.popoverController.dismiss()
    this.tokenService.logout()
  }

}
