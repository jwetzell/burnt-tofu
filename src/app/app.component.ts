import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserService, WanikaniTokenService } from 'wanikani-api-ng';
import { AppState } from './state';
import { setUserData, setUserPreferences, unsetUserState } from './state/user/user.actions';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tokenService: WanikaniTokenService,
    private userService: UserService,
    private toastController: ToastController,
    private router: Router,
    private menuController: MenuController,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.tokenService.getIsAuthenticated().subscribe(
      (auth) => {
        this.menuController.enable(auth, 'side');
        if (!auth) {
          // remove user info
          this.store.dispatch(unsetUserState());
          this.router.navigate(['login']);
        } else {
          // ensure the user is set
          this.userService.getUser().pipe(take(1)).subscribe(
            {
              next: (user) => {
                this.store.dispatch(setUserData({user}));
                this.store.dispatch(setUserPreferences({preferences: user.data.preferences}));
                this.router.navigate(['home']);
              },
              error: (err) => {
                this.toastController.create({message: 'Something went wrong. Please verrify your api token is correct', duration: 1000})
                  .then(t => t.present())
                this.tokenService.logout();
              }
            }
          );
        }
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
