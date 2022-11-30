import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { DepartmentService } from '../servers/department.service';
import { Department } from '../shared/departments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private depService:DepartmentService ) { }

  currentUserLogged:any;

  ngOnInit(): void {
    this.currentUserLogged = JSON.parse(localStorage.getItem("UserLogged")) as Observable<any> 
  }
}