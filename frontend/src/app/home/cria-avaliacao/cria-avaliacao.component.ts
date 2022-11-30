import { query } from '@angular/animations';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from 'src/app/services/conta.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-cria-avaliacao',
  templateUrl: './cria-avaliacao.component.html',
  styleUrls: ['./cria-avaliacao.component.scss'],
})
export class CriaAvaliacaoComponent implements OnInit {

  tokem: any
  idUser: any
  httpOptions: any
  avaliacaoAtual: any
  idAvaliacao: any
  user: string = ''
  name: string = ''
  url: string = ''
  description: string = ''
  formBuilder: any;
  disable: boolean = true
  liberaBotao: boolean = true

  constructor(
    private homeService: HomeService,
    private contaService: ContaService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.tokem = window.localStorage.getItem('tokem')
    this.idUser = window.localStorage.getItem('idUser')
    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }


  }

  async criarAvaliacao() {

    let assessments = {
      user: this.idUser,
      name: this.name,
      object: this.url,
      description: this.description,
      answer: []
    }
    await this.homeService.criarAvaliacao(assessments, this.httpOptions).then(
      async (res: any) => {
        this.idAvaliacao = res._id

        this.router.navigate([`home/realizaAvaliacao/${this.idAvaliacao}`])
      },
      (e: Error) => {
        this.contaService.showMensageError('Ops, algo deu errado. Reinicie a página')
      }
    )
  }

  async criarResposta() {
    let answer = {

    }
  }

  // async getAvaliacao() {
  //   await this.homeService.getAvaliacao(this.httpOptions).then(
  //     (res: any) => {
  //       this.avaliacaoAtual = res.filter((e: any) => {
  //         return e.name == this.name
  //       })
  //     }
  //   )

  //   this.idAvaliacao = this.avaliacaoAtual[0]._id
  //   console.log(this.idAvaliacao, 'id');

  // }


  tituloAvaliacao(e: any) {
    this.name = e.detail.value

    if (this.user == null) {
      this.liberaBotao = true
    } this.liberaBotao = false
  }




}
