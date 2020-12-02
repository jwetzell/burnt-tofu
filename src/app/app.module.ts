import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { WanikaniApiNgModule, WanikaniTokenModule } from 'wanikani-api-ng';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './home/home.module';
import { LoginPageModule } from './login/login.module';
import { MenuModule } from './menu/menu.module';
import { UserPageModule } from './user/user.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    WanikaniApiNgModule,
    WanikaniTokenModule,
    MenuModule,

    LoginPageModule,
    HomePageModule,
    UserPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
