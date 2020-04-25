import { Component, OnInit } from '@angular/core';
import { WanikaniTokenService, UserData, UserService } from 'wanikani-api-ng';
import { Observable, iif, EMPTY } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: Observable<UserData>;
  constructor(private tokenService: WanikaniTokenService, private userService: UserService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.user = this.tokenService.getIsAuthenticated().pipe(
      mergeMap(auth => iif(() => auth, this.userService.getUser().pipe(map(user => user.data)), EMPTY))
    );
  }

  openUserPopOver(event: any){
    const userPopOver = this.popoverController.create({
      component: UserInfoComponent,
      event: event,
      translucent: true
    })

    userPopOver.then(popover => popover.present())
  }

}
