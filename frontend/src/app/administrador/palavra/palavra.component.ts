import { ContaService } from 'src/app/services/conta.service';
import { AdministradorService } from './../administrador.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-palavra',
  templateUrl: './palavra.component.html',
  styleUrls: ['./palavra.component.scss'],
})
export class PalavraComponent implements OnInit {

  entry: string = ''
  tokem: any
  descricao: string = ''
  liberaBotao: boolean = true
  liberarGlossario: boolean = false
  glossarioPalavra: any
  palavrasOn: boolean = true
  selecao!: string

  constructor(
    private adminService: AdministradorService,
    private contaService: ContaService,
    private homeService: HomeService

  ) { }

  ngOnInit() {
    this.tokem = window.localStorage.getItem('tokem')

    this.getGlossario()
  }

  pegaPalavra() {
    this.verficar()
  }

  pegaDescricao() {
    this.verficar()
  }

  verficar() {
    if (this.entry == '' || this.descricao == '') {
      this.liberaBotao = true
      return
    } this.liberaBotao = false
  }

  criarCriterio() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }

    let question: object
    question = {
      entry: this.entry,
      description: this.descricao
    }

    this.adminService.inserirPalavra(httpOptions, question).then(
      (res: any) => {
        this.contaService.showMensage('Palavra inserido com sucesso')
        this.entry = ''
        this.descricao = ''
      }
    )
  }


  async getGlossario() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }

    let resposta
    resposta = await this.homeService.getGlossaio(httpOptions)
    this.glossarioPalavra = resposta
  }

  liberarPalavras(){
    this.liberarGlossario = true
  }

  esconderPalavras(){
    this.liberarGlossario = false
  }

}
