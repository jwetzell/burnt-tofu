import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'wanikani-api-ng';
import { HomePage } from './home/home.page';
import { UserPage } from './user/user.page';
import { LoginPage } from './login/login.page';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], component: HomePage },
  { path: 'user', canActivate: [AuthGuard], component: UserPage },
  { path: 'login', component: LoginPage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
