import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public appPages = [
    { title: 'Home', url: 'dashboard', icon: '../../assets/house.png' },
    { title: 'Glossario', url: 'glossario', icon: '../../assets/dictionary (1).png' },
    { title: 'Avaliação', url: 'criaAvaliacao', icon: '../../assets/assignment.png' },

  ];
  user: any

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getUser()
  }

  getUser() {
    this.user = window.localStorage.getItem('user')
  }

  logOut() {
    window.localStorage.clear()
    this.router.navigate([''])
  }
}
