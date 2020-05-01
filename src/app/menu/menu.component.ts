import { Component, OnInit, OnDestroy } from '@angular/core';
import { WanikaniTokenService, UserData, UserService } from 'wanikani-api-ng';
import { Observable, Subject } from 'rxjs';
import { map, filter, takeUntil, switchMap, tap } from 'rxjs/operators';
import { PopoverController, ModalController } from '@ionic/angular';
import { UserInfoComponent } from '../user-info/user-info.component';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {

  user: Observable<UserData>;
  userLoaded = new Subject();
  constructor(private tokenService: WanikaniTokenService, 
              private userService: UserService, 
              private popoverController: PopoverController,
              private modalController: ModalController) { }

  ngOnInit() {
    console.log('menu init')
    this.user = this.tokenService.getIsAuthenticated().pipe(
      filter(auth => auth),
      switchMap(_ => this.userService.getUser().pipe(map(user => user.data)))
    )
  }

  ngOnDestroy(){
    console.log('menu destroy')
  }

  openUserPopOver(event: any){
    const userPopOver = this.popoverController.create({
      component: UserInfoComponent,
      event: event,
      translucent: true
    })

    userPopOver.then(popover => popover.present())
  }

  logout(){
    this.tokenService.logout()
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
