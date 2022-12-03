import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children: [
      {path: '', redirectTo: 'singIn', pathMatch:'full'},
      {path: 'singIn', component: SingInComponent},
      {path: 'singUp', component: SingUpComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
