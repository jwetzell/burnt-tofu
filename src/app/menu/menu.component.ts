import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { UserData, UserService, WanikaniTokenService } from 'wanikani-api-ng';
import { SettingsPage } from '../settings/settings.page';
import { AppState } from '../state';
import { unsetUserState } from '../state/user/user.actions';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: Observable<UserData>;
  userLoaded = new Subject();
  constructor(private tokenService: WanikaniTokenService,
              private userService: UserService,
              private store: Store<AppState>,
              private popoverController: PopoverController,
              private modalController: ModalController) { }

  ngOnInit() {
    this.user = this.tokenService.getIsAuthenticated().pipe(
      filter(auth => auth),
      switchMap(_ => this.userService.getUser().pipe(map(user => user.data)))
    )
  }

  openUserPopOver(event: any){
    const userPopOver = this.popoverController.create({
      component: UserInfoComponent,
      event,
      translucent: true
    })

    userPopOver.then(popover => popover.present())
  }

  logout(){
    this.tokenService.logout();
    this.store.dispatch(unsetUserState());
  }

  openPreferences(){
    const preferenceModal = this.modalController.create({
      component: SettingsPage
    });

    preferenceModal.then(
      (modal)=>{
        modal.present()
      }
    )
  }

}
