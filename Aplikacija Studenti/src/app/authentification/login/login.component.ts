import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servers/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public _authService: AuthService,
    private router:Router,
    private fb:FormBuilder
  ) { }

  keepUserLogged = localStorage.getItem("UserLogged")
  ngOnInit(): void {
    if(this.keepUserLogged){
      this._authService.token = true;
      this.router.navigate(["home"])
    }
  }

  loginBuilder = this.fb.group({
    auth:this.fb.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  })
  

  login(form:any){
    
    if(form.valid){
      this._authService.logIn(form)
    }
    else{
      alert("Something went wrong!\nTry Again.")
    }
    return form
  }

  goSignIn(){
    this.router.navigate(["signup"])
  }
}
