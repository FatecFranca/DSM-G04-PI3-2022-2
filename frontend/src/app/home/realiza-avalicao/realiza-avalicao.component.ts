import { ContaService } from './../../services/conta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-realiza-avalicao',
  templateUrl: './realiza-avalicao.component.html',
  styleUrls: ['./realiza-avalicao.component.scss'],
})
export class RealizaAvalicaoComponent implements OnInit {
  tokem: any;
  httpOptions: any;
  perguntas: any;
  index: number = 0;
  progresso: number = 0;
  calculo!: number;
  comentario: string = '';
  coment: boolean = false;
  answers!: Object;
  controleOBJ: any;
  arayPergunta: any;
  perguntasTamanho!: number;
  idAvaliacao: any

  constructor(
    private homeService: HomeService,
    private contaService: ContaService,
    private router: Router,
    private novaRota: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.tokem = window.localStorage.getItem('tokem');
    this.httpOptions = {
      headers: new HttpHeaders({ Authorization: this.tokem }),
    };

    this.getPerguntas();

    this.idAvaliacao = this.novaRota.snapshot.paramMap.get("id");
  }
  //******************************************************************************************************************
  async getPerguntas() {
    await this.homeService.getPerguntas(this.httpOptions).then(async (res) => {
      this.perguntas = await res;

      this.perguntasTamanho = this.perguntas.length;
      this.controleOBJ = await this.perguntas.splice(0, 1);
    }),
      (erro: Error) => {
        console.log(erro);
      };
  }
  //******************************************************************************************************************

  next() {
    this.controleOBJ = this.perguntas.splice(0, 1);
  }

  respostaNao() {
    this.answers = {
      question: this.controleOBJ[0]._id,
      answer: 'N',
      comment: this.comentario,
    };

    this.homeService.InserirResposta(this.answers, this.httpOptions, this.idAvaliacao)
      .then((res) => {
      }),
      (erro: Error) => {
        // this.contaService.ToastError(erro.message);
      };

    this.next();
    this.comentario = ''
    this.progresso = this.progresso + 100 / this.perguntasTamanho;
  }
  //******************************************************************************************************************

  async respostaSim() {
    this.answers = {
      question: this.controleOBJ[0]._id,
      answer: 'S',
      comment: this.comentario,
    };

    this.homeService.InserirResposta(this.answers, this.httpOptions, this.idAvaliacao)
      .then((res) => {
      }),
      (erro: Error) => {
        // this.contaService.ToastError(erro.message);
      };

    this.next();
    this.comentario = ''
    this.progresso = this.progresso + 100 / this.perguntasTamanho;
  }
  //******************************************************************************************************************

  respostaNA() {
    this.answers = {
      question: this.controleOBJ[0]._id,
      answer: 'NA',
      comment: this.comentario,
    };
    this.homeService.InserirResposta(this.answers, this.httpOptions, this.idAvaliacao)
      .then((res) => {
      }),
      (erro: Error) => {
        // this.contaService.ToastError(erro.message);
      };

    this.next();
    this.comentario = ''
    this.progresso = this.progresso + 100 / this.perguntasTamanho;

  }
  //******************************************************************************************************************

  irParaRelatorio() {
    this.router.navigate([`/home/relatorioAvaliacao/${this.idAvaliacao}`]);
  }
  //******************************************************************************************************************

  irParaAvaliacao() {
    this.router.navigate(['/home/criaAvaliacao']);
  }
  //******************************************************************************************************************

  irParaMenu() {
    this.router.navigate(['/home']);
  }
}
