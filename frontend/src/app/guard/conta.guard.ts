import { ContaService } from './../services/conta.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContaGuard implements CanActivate {
  constructor(
    private contaService: ContaService,
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

    if(this.contaService.checarToken() == true){
      return true
    }
    this.router.navigate([''])
    return false
  }

}
