import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContaService } from 'src/app/services/conta.service';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private homeService: HomeService,
    private loadingCtrl: LoadingController

  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
  }
  async getRegister() {

    await this.homeService.showLoading('Aguarde, cadastrando...')

    let account = {
      name: this.formulario.value.name,
      email: this.formulario.value.email,
      password: this.formulario.value.password,
      password_confirmation: this.formulario.value.password_confirmation,
      is_admin: false
    }

    let resposta
    await this.contaService.register(account).then(
      async (res) => { resposta = await res, this.loadingCtrl.dismiss() },
      (error) => {
        this.loadingCtrl.dismiss()
        this.contaService.showMensageError(error.error.message)

      }
    )

    if (resposta) {
      this.contaService.showMensage('Usuário cadastrado com sucesso')
      this.router.navigate(['login/singIn'])
    }
  }

}
