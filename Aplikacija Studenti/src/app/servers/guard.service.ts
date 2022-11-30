import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./authentification.service";

@Injectable()
export class guardService{

    constructor(private router:Router,
               private _authService:AuthService){}
               canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
                // if(!this._authService.isLogged()){
                //     this.router.navigate(["**"])
                // }
                // else{
                //     return this._authService.isLogged();
                // }
                // return true;
    }
}