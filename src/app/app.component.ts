import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WanikaniTokenService } from 'wanikani-api-ng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tokenService: WanikaniTokenService,
    private router: Router
  ) {
    this.initializeApp();
    this.tokenService.logout()
    this.tokenService.getIsAuthenticated().subscribe(
      (auth)=>{
        console.log(auth)
        if(!auth){
          this.router.navigate(['login'])
        }else{
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
