import { PerguntaComponent } from './pergunta/pergunta.component';
import { CriterioComponent } from './criterio/criterio.component';
import { PalavraComponent } from './palavra/palavra.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorPage } from './administrador.page';
import { AdminGuard } from '../guard/admin.guard';

const routes: Routes = [
  {
    path: '', component: AdministradorPage, canActivate: [AdminGuard]
  },
  { path: 'palavra', component: PalavraComponent, canActivate: [AdminGuard] },
  { path: 'criterio', component: CriterioComponent, canActivate: [AdminGuard] },
  { path: 'pergunta', component: PerguntaComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorPageRoutingModule { }
