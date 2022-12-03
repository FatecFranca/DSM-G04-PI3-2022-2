import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { API } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContaService {

  resposta: any;
  toastController: any;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  async login(user: any) {

    return lastValueFrom(this.http.post(`${API}/login`, user));
  }

  async register(account: any) {
    return lastValueFrom(this.http.post(`${API}/user`, account));
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

  checarToken(): boolean {
    if (window.localStorage.getItem('tokem')) { return true }
    return false
  }

  checarRole(): boolean {
    let admin: any
    admin = window.localStorage.getItem('admin')

    if (admin == 'true') { return true }
    return false
  }
}
