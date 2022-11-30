import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servers/authentification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  userFormBuilder = this.authService.buildForm

  ngOnInit(): void {
  }

  signup(form:any){
    if(form.valid){
      if(form.value.auth.password == form.value.rePassword){
        this.authService.signUpAndAddUser(form)
        let confirmed = confirm("Successfuly Created Account!\nGo on logIn page ?")
            if(confirmed) this.router.navigate(["login"])
      }
  else{
      alert("Passwords are not the same!")
  }
    }
    else{
      alert("Some input field is not valid!")
    }
  }
}
