import { Component, OnInit } from '@angular/core';
import { WanikaniTokenService, UserData, UserService } from 'wanikani-api-ng';
import { Observable, Subject } from 'rxjs';
import { map, filter, takeUntil, switchMap, tap } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: Observable<UserData>;
  userLoaded = new Subject();
  constructor(private tokenService: WanikaniTokenService, private userService: UserService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.user = this.tokenService.getIsAuthenticated().pipe(
      filter(auth => auth),
      switchMap(_ => this.userService.getUser().pipe(map(user => user.data)))
    )
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
