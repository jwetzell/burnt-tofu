import { Component, OnInit } from '@angular/core';
import { UserService, UserData, WanikaniTokenService, WaniSubscription, Preferences } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.modal.html',
  styleUrls: ['./user.modal.scss'],
})
export class UserModal implements OnInit {

  constructor(private userService: UserService, private tokenService:WanikaniTokenService, private modalController: ModalController) { }
  
  user: Observable<UserData>
  subscription: Observable<WaniSubscription>
  preferences: Observable<Preferences>

  ngOnInit() {
    this.user = this.userService.getUser().pipe(
      map(user=>user.data)
    )
    this.subscription = this.user.pipe(
      map(user=>user.subscription)
    )
    this.preferences = this.user.pipe(
      map(user=>user.preferences)
    )
  }
  
  dismiss(){
    this.modalController.dismiss();
  }

  logout(){
    this.tokenService.logout();
    this.modalController.dismiss();
  }

}
