import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
    private homeService: HomeService,
    private loadingCtrl: LoadingController

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
    this.homeService.showLoading('Carregando Glossário...')
    let resposta
    await this.homeService.getGlossaio(this.httpOptions).then(
      (res)=>{
        this.loadingCtrl.dismiss()
        resposta = res
        
      }
    )
    this.glossarioPalavra = resposta
  }

  async getCriterio() {
   

    let resposta
    await this.homeService.getCriterios(this.httpOptions).then(
      (res)=>{

        resposta = res
        
      })
      
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
