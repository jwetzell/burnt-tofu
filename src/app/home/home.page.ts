import { Component, OnInit } from '@angular/core';
import { UserData } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private modalController:ModalController, private router:Router) {}

  ngOnInit(){
  }

  openUserModal(){
    this.router.navigate(['/user'])
  }

}
