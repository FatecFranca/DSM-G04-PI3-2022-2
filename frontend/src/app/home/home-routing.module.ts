import { RelatorioAvaliacaoComponent } from './relatorio-avaliacao/relatorio-avaliacao.component';
import { CriaAvaliacaoComponent } from './cria-avaliacao/cria-avaliacao.component';
import { ContaGuard } from './../guard/conta.guard';
import { RealizaAvalicaoComponent } from './realiza-avalicao/realiza-avalicao.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomePage } from './home.page';
import { GlossarioComponent } from './glossario/glossario.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage, canActivate: [ContaGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [ContaGuard] },
      { path: 'glossario', component: GlossarioComponent, canActivate: [ContaGuard] },
      { path: 'criaAvaliacao', component: CriaAvaliacaoComponent, canActivate: [ContaGuard] },
      { path: 'realizaAvaliacao/:id', component: RealizaAvalicaoComponent, canActivate: [ContaGuard] },
      { path: 'relatorioAvaliacao/:id', component: RelatorioAvaliacaoComponent, canActivate: [ContaGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
