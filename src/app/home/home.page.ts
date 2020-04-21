import { Component, OnInit } from '@angular/core';
import { UserData } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { UserModal } from '../user/user.modal';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  user: Observable<UserData>
  constructor(private modalController:ModalController) {}

  ngOnInit(){
  }

  openUserModal(){
    this.modalController.create({
      component:UserModal
    }).then(
      (userModal)=>{
        userModal.present();
      }
    )
  }

}
