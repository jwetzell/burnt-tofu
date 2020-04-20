import { Component, OnInit } from '@angular/core';
import { WanikaniTokenService } from 'wanikani-api-ng';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  apiToken: string;
  constructor(private tokenService: WanikaniTokenService) { }

  ngOnInit() {
  }

  login(){
    this.tokenService.setApiToken(this.apiToken)
  }

}
