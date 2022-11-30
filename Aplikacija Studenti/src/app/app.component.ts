import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './servers/authentification.service';
import { ServerService } from './servers/server.service';
import {Category} from "./shared/models/category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(public authService:AuthService,
      private router:Router
    ){}

  ngOnInit(){
    
  }

  category:Category[] = [
    {
      id:1,
      name:"Korisnici"
    },
    {
      id:2,
      name:"Studenti"
    },
    {
      id:3,
      name:"Profesori"
    },
    {
      id:4,
      name:"depart."
    }
  ]

  goHome(id:number, name:string){
    this.router.navigate(["home/korisnici", id, name])
  }

  logOut(){
    this.authService.logOut()
  }
}