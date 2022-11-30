import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  irParaCriterio(){
    this.router.navigate(['/administrador/criterio'])
  }

  logOut(){
    window.localStorage.clear()
    this.router.navigate([''])
  }
}
