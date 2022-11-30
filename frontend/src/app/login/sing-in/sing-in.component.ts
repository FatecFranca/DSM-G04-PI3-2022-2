import { ContaService } from './../../services/conta.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent implements OnInit {

  formulario!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private contaService: ContaService
  ) {
    localStorage.clear()
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  async logar() {
    let user = {
      email: this.formulario.value.email,
      password: this.formulario.value.senha,
    };

    let resposta: any;

    await this.contaService.login(user).then(
      async (res) => {
        resposta = await res

      }, (error) => {
        this.contaService.showMensageError(error.error.message)
      }
    )

    if (resposta.accessToken || resposta.is_admim) {

      window.localStorage.setItem('tokem', await resposta.accessToken);
      window.localStorage.setItem('admin', await resposta.is_admin);
      window.localStorage.setItem('idUser', await resposta._id);
      window.localStorage.setItem('user', await resposta.name);

    } else {
      return alert(
        'Usuário sem permissão! \n Página disponível somente para usuários administradores'
      );
    }


    if (resposta.is_admin) {
      await this.route.navigate(['administrador']);
      return
    }

    if (resposta.accessToken) {
      await this.route.navigate(['home']);
      return
    } else {
      return alert(
        // this.contaService.ToastError('Usuario sem cadastro')
      );
    }
  }
}
