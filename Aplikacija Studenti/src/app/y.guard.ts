import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterState, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './servers/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class YGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):any {
    if(!this.authService.isLogged()){
      this.router.navigate(["**"])
      return false
    } return;
  }
}