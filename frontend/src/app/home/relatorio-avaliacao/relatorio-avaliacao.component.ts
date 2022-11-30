import { HomeService } from './../../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-relatorio-avaliacao',
  templateUrl: './relatorio-avaliacao.component.html',
  styleUrls: ['./relatorio-avaliacao.component.scss'],
})
export class RelatorioAvaliacaoComponent implements OnInit {

  idAvaliacao!: any
  httpOptions: any
  tokem: any
  avaliacaoID: any
  respostas: any
  questions: Array<any> = []
  user: any
  nome: any
  url: any
  descricao: any
  data: any

  constructor(
    private novaRota: ActivatedRoute,
    private homeService: HomeService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private contaService : ContaService


  ) { }

  ngOnInit() {
    this.idAvaliacao = this.novaRota.snapshot.paramMap.get("id");
    this.tokem = window.localStorage.getItem('tokem');
    this.user = window.localStorage.getItem('user');
    this.httpOptions = {
      headers: new HttpHeaders({ Authorization: this.tokem }),
    };

    this.getavaliacaoId()
  }

  async getavaliacaoId() {
    this.homeService.getAvaliacaoId(this.idAvaliacao, this.httpOptions).then(
      async (res) => {
        this.avaliacaoID = await res
        this.nome = this.avaliacaoID.name
        this.url = this.avaliacaoID.object
        this.descricao = this.avaliacaoID.description
        this.data = this.avaliacaoID.created_at
        this.respostas = this.avaliacaoID.answers

        this.getPerguntas()


      }, (error: Error) => {

      }
    )
  }

  getPerguntas() {

    for (const iterator of this.respostas) {
      this.homeService.getPerguntasId(iterator.question, this.httpOptions).then(
        (res) => {
          let res2: any
          res2 = res
          this.questions.push(res2.enunciation)
        }
        )
    }

  }
  irParaMenu() {
    this.router.navigate(['home'])
  }

  locationreload() {

    // To reload the entire page from the server
    location.reload();
    }

  async excluirAvaliacao() {

    const alert = await this.alertController.create({
      header: 'Depois de excluido, os dados dessa avaliação serão perdidos!',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Não',
          cssClass: 'alert-button-cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.homeService.exlcuirAvaliacao(this.idAvaliacao, this.httpOptions).then(
              (res: any) => {
                this.contaService.showMensage('Avaliação excluída com sucesso')
                this.router.navigate(['/home'])
              }
            )
          }
        },
      ],
    });

    await alert.present();




  }

}
