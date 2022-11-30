import { ContaService } from 'src/app/services/conta.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  httpOptions: any
  avaliacaoAll: any
  tokem: any
  avaliacaoVazia: boolean = false
  user: any

  constructor(
    private router: Router,
    private homeService: HomeService,
    private contaService: ContaService,
    private loadingCtrl: LoadingController

  ) { }

  ngOnInit(): void {
    this.tokem = window.localStorage.getItem('tokem')
    this.user = window.localStorage.getItem('user');

    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.tokem }),
    }

    this.getAvaliacao()
    this.contaService.checarRole()
  }

  toAvaliacao() {
    this.router.navigate(['home/criaAvaliacao'])
  }

  async getAvaliacao() {

    await this.homeService.showLoading('Aguarde, pesquisando Avaliações')

    await this.homeService.getAvaliacao(this.httpOptions).then(
      async (res: any) => {
        this.loadingCtrl.dismiss()
        this.avaliacaoAll = await res
        if (this.avaliacaoAll) {
          console.log(this.avaliacaoAll);


        }
        if (this.avaliacaoAll.length == 0) {
          this.loadingCtrl.dismiss()
          this.avaliacaoVazia = true
        }
      }
    )
  }

  irParaRelatorio(idAvaliacao: any) {
    this.router.navigate([`/home/relatorioAvaliacao/${idAvaliacao}`]);
  }
}
