import { RelatorioAvaliacaoComponent } from './relatorio-avaliacao/relatorio-avaliacao.component';
import { CriaAvaliacaoComponent } from './cria-avaliacao/cria-avaliacao.component';
import { RealizaAvalicaoComponent } from './realiza-avalicao/realiza-avalicao.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';



import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { GlossarioComponent } from './glossario/glossario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatSelectModule,
    MatProgressBarModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HomePage,
    RealizaAvalicaoComponent,
    CriaAvaliacaoComponent,
    GlossarioComponent,
    RelatorioAvaliacaoComponent
  ]
})
export class HomePageModule { }
