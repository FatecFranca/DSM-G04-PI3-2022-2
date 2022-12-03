import { HomeService } from 'src/app/services/home.service';
import { ContaService } from 'src/app/services/conta.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../administrador.service';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrls: ['./criterio.component.scss'],
})
export class CriterioComponent implements OnInit {
  name: string = ''
  user: string = ''
  ordem!: number
  tokem!: any
  criterio: string = ''
  descricao: string = ''
  httpOptions: any
  glossarioCriterio: any
  liberaBotao: boolean = true
  liberarGlossario: boolean = false

  ordemCriterios = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,]

  constructor(
    private adminService: AdministradorService,
    private contaService: ContaService,
    private homeService: HomeService

  ) { }

  ngOnInit() {
    this.tokem = window.localStorage.getItem('tokem')

    this.getCriterio()
  }

  pegaPalavra() {
    this.verficar()
  }

  pegaDescricao() {
    this.verficar()
  }

  pegaOrdem(e: number) {
    this.ordem = e

    this.verficar()
  }

  verficar() {
    if (this.criterio == '' || this.descricao == '') {
      this.liberaBotao = true
      return
    } this.liberaBotao = false
  }

  criarCriterio() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }

    let criterion: object
    criterion = {
      order: this.ordem,
      name: this.criterio,
      description: this.descricao
    }

    this.adminService.inserirCriterio(httpOptions, criterion).then(
      (res: any) => {
        this.contaService.showMensage('Criterio inserido com sucesso')
        this.criterio = ''
        this.descricao = ''
      }
    )
  }

  async getCriterio() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }

    let resposta
    resposta = await this.homeService.getCriterios(httpOptions)
    this.glossarioCriterio = resposta
  }

  liberarPalavras(){
    this.liberarGlossario = true
  }

  esconderPalavras(){
    this.liberarGlossario = false
  }
}
