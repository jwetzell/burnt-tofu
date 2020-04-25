import { Component, OnInit } from '@angular/core';
import { UserService, UserData, WaniSubscription, WanikaniTokenService } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  user: Observable<UserData>;

  constructor(private userService:UserService, private tokenService: WanikaniTokenService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.user = this.userService.getUser().pipe(
      map(user=>user.data)
    )
  }

  logout(){
    this.popoverController.dismiss()
    this.tokenService.logout()
  }

}
