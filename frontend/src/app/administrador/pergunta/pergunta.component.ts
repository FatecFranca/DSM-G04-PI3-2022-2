import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContaService } from 'src/app/services/conta.service';
import { HomeService } from 'src/app/services/home.service';
import { AdministradorService } from '../administrador.service';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.scss'],
})
export class PerguntaComponent implements OnInit {

  nn: number = 0
  tokem: any
  criterios: any
  ordem!: number
  criterio: any
  palavras: any
  glossarioId: any
  arrayGloss: Array<any> = []
  perguntas: any
  liberaBotao: boolean = false
  botaoAdd: boolean = false
  select!: FormControl
  perguntaNg: any
  liberarPerguntas: boolean = false
  ordemPerguntas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,19,20]


  constructor(
    private adminService: AdministradorService,
    private contaService: ContaService,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.tokem = window.localStorage.getItem('tokem')

    this.getPerguntas()
    this.getCriterio()
    this.getGlossario()
    this.select = new FormControl([]);

  }


  criarPergunta(){
    this.arrayGloss = this.select.value

    for (const i of this.select.value) {
      this.arrayGloss = i._id
    }

    let question
    question = {
      criterion: this.criterio,
      order: this.ordem,
      enunciation: this.perguntaNg,
      glossary_refs: this.arrayGloss
    }

    console.log(question);



  }

  async getPerguntas() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }

    let resposta
    resposta = await this.homeService.getPerguntas(httpOptions)
    this.perguntas = resposta
    console.log(this.perguntas,'perguntasss');

  }
  pegaCriterio(e: any){
    this.criterio = e
  }

  async getCriterio() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }

    let resposta
    resposta = await this.homeService.getCriterios(httpOptions)
    this.criterios = resposta
  }

  async getGlossario() {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }

    let resposta
    resposta = await this.homeService.getGlossaio(httpOptions)
    this.palavras = resposta
  }

  mostrarPerguntas(){
    this.liberarPerguntas = true
  }
  esconderPerguntas(){
    this.liberarPerguntas = false
  }

  pegaOrdem(e: number) {
    this.ordem = e
    this.verficar()
  }

  pegaPergunta() {
    this.verficar()
  }

  pegaGlossario(e: any){
    this.glossarioId = e._id
    this.botaoAdd = true
  }

  verficar() {
    if (this.perguntaNg == '' || this.ordem == null) {
      this.liberaBotao = true
      return
    } this.liberaBotao = false
  }
}
