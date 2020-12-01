import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { UserService, WanikaniTokenService } from 'wanikani-api-ng';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tokenService: WanikaniTokenService,
    private userService: UserService,
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
          this.router.navigate(['login']);
        } else {
          // store user info
          this.userService.getUser();
          this.router.navigate(['home']);
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
