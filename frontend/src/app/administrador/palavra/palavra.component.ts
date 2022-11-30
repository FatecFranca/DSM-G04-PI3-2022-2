import { ContaService } from 'src/app/services/conta.service';
import { AdministradorService } from './../administrador.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private adminService: AdministradorService,
    private contaService: ContaService
  ) { }

  ngOnInit() {
    this.tokem = window.localStorage.getItem('tokem')
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
}
