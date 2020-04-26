import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WanikaniTokenService, UserService } from 'wanikani-api-ng';
import { Router } from '@angular/router';

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

  ngOnInit(){
    this.tokenService.getIsAuthenticated().subscribe(
      (auth)=>{
        this.menuController.enable(auth,'side')
        if(!auth){
          this.userService.clearCache();
          this.router.navigate(['login'])
        } else{
          this.userService.getUser();
          this.router.navigate(['home'])
        }
      }
    )
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
