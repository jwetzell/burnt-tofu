import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserData, WanikaniTokenService } from 'wanikani-api-ng';
import { SettingsPage } from '../settings/settings.page';
import { AppState } from '../state';
import { userData } from '../state/user/user.selectors';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user$: Observable<UserData>;

  navigationEndEvents$: Observable<Event>;

  constructor(private tokenService: WanikaniTokenService,
              private store: Store<AppState>,
              private popoverController: PopoverController,
              private modalController: ModalController,
              private router: Router) { }

  ngOnInit() {
    this.user$ = this.store.pipe(
      select(userData),
      filter(x => !!x)
    )

    this.navigationEndEvents$ = this.router.events.pipe(
      filter(event=>event instanceof NavigationEnd)
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
