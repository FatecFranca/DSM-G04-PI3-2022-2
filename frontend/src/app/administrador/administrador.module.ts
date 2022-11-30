import { PerguntaComponent } from './pergunta/pergunta.component';
import { PalavraComponent } from './palavra/palavra.component';
import { CriterioComponent } from './criterio/criterio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { IonicModule } from '@ionic/angular';

import { AdministradorPageRoutingModule } from './administrador-routing.module';

import { AdministradorPage } from './administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorPageRoutingModule,
    MatSelectModule
  ],
  declarations: [AdministradorPage, CriterioComponent, PalavraComponent, PerguntaComponent]
})
export class AdministradorPageModule {}
