import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-glossario',
  templateUrl: './glossario.component.html',
  styleUrls: ['./glossario.component.scss'],
})
export class GlossarioComponent implements OnInit {

  glossarioPalavra: any
  palavrasOn: boolean = true
  glossarioCriterio: any
  criteriosOn: boolean = false
  selecao!: string
  httpOptions!: any
  tokem: any

  constructor(
    private http: HttpClient,
    private homeService: HomeService
  ) { this.palavras() }

  ngOnInit(): void {
    this.tokem = window.localStorage.getItem('tokem')
    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }
    this.getGlossario()
    this.getCriterio()
  }

  async getGlossario() {
    let resposta
    resposta = await this.homeService.getGlossaio(this.httpOptions)
    this.glossarioPalavra = resposta
  }

  async getCriterio() {
    let resposta
    resposta = await this.homeService.getCriterios(this.httpOptions)
    this.glossarioCriterio = resposta
  }

  citerios() {
    this.criteriosOn = true
    this.palavrasOn = false
    this.selecao = 'Critérios'
  }

  palavras() {
    this.palavrasOn = true
    this.criteriosOn = false
    this.selecao = 'Palavras'
  }

}
