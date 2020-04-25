import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WanikaniTokenService } from 'wanikani-api-ng';
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
    private router: Router,
    private menuController: MenuController,
  ) {
    this.initializeApp();
    //This was for testing purposes so I could 'logout'
    //this.tokenService.logout()
    toString
  }

  ngOnInit(){
    this.tokenService.getIsAuthenticated().subscribe(
      (auth)=>{
        this.menuController.enable(auth,'side')
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
