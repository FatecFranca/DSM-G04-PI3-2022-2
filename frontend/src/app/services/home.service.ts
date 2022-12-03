import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { API } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private snackBar: MatSnackBar
  ) { }

  async getGlossaio(header: any) {
    return (await lastValueFrom(this.http.get(`${API}/glossary`, header)))
  }

  async getCriterios(header: any) {
    return (await lastValueFrom(this.http.get(`${API}/criterion`, header)))
  }

  async getPerguntas(header: any) {
    return (await lastValueFrom(this.http.get(`${API}/question`, header)))
  }

  async getPerguntasId(id: any, header: any) {
    return (await lastValueFrom(this.http.get(`${API}/question/${id}`, header)))
  }

  async getAvaliacao(header: any) {
    return (await lastValueFrom(this.http.get(`${API}/assessment`, header)))
  }

  async getAvaliacaoId(id: any, header: any) {
    return (await lastValueFrom(this.http.get(`${API}/assessment/${id}`, header)))
  }

  async criarAvaliacao(body: any, header: any) {
    return (await lastValueFrom(this.http.post(`${API}/assessment`, body, header)))
  }

  async exlcuirAvaliacao(id: any, header: any) {
    return (await lastValueFrom(this.http.delete(`${API}/assessment/${id}`, header)))
  }

  async InserirResposta(body: any, header: any, id: any) {
    return (await lastValueFrom(this.http.post(`${API}/assessment/${id}/answer`, body, header)))
  }

  async showLoading(msg: string) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      spinner: 'circles',
    });
    loading.present();
  }


  showMensage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["msg-sucess"]
    })
  }

  showMensageError(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["msg-error"]
    })
  }

}
