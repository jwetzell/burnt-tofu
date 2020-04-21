import { Component, OnInit } from '@angular/core';
import { UserService, UserData, WanikaniTokenService } from 'wanikani-api-ng';
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
  ngOnInit() {
    this.user = this.userService.getUser().pipe(
      map(user=>user.data)
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
