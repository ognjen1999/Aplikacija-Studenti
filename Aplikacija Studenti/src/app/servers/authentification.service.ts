import { Injectable } from "@angular/core";
import {Router} from "@angular/router";
import {Auth,GoogleAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { addDoc, collection, Firestore } from "@angular/fire/firestore";
@Injectable()
export class AuthService{

    
    constructor(private router:Router,
        private _auth:Auth,
        private afAuth:AngularFireAuth,
        private fb:FormBuilder,
        private firestore:Firestore
        ){}

     

       public token = false;

        KeepUserLogged = {
            email:"",
            password:""
          }
          isUserLogged

          //Line below give true of false if user is logged or not, implements on appComponent.html
          IsUserLogged(){
             return this.isUserLogged = localStorage.getItem("UserLogged")
          }

       public KeepUserLoggedFunc(){
           return localStorage.setItem("UserLogged", JSON.stringify(this.KeepUserLogged))
       }

    signUpAndAddUser(form:any){

        //creates user account for logging
        createUserWithEmailAndPassword(this._auth, form.value.auth.email, form.value.auth.password)
        .then(() => {

            //Adding users infos to firestore data base
            this.addUser(form.value)

            .then(() => {
                alert("User added,\nAnd account created!")
            console.log("User added,\nAnd account created!");
          })
        .catch((err) => {
          alert(err.message)
        })

        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })
    }

    addUser(form:any){
        let users = collection(this.firestore, form.typeOfUser)
        return addDoc(users, form)
    }

    logIn(form:any){
       signInWithEmailAndPassword(this._auth, form.value.auth.email, form.value.auth.password)
       .then(() => {
       this.router.navigate(["home"])
       this.token = true


       //SETS CURRENT LOGGED USER KEEP LOGGED AFTER REFRESHING THE PAGE
       this.KeepUserLogged.email = form.value.auth.email
       this.KeepUserLogged.password = form.value.auth.password
       localStorage.setItem("UserLogged", JSON.stringify(this.KeepUserLogged))

       })
       .catch((err) => {
        alert(err)
        console.log(err)
       })
    }

    logOut(){
        this.token = false;
        localStorage.removeItem("UserLogged")
        this.router.navigate([""])
    }

    isLogged(){
        return this.token != false;
    }


   signInWithGoogle(){
    return this.AuthLogin(new GoogleAuthProvider())
    }

    AuthLogin(provider:any){
        return this.afAuth
        .signInWithPopup(provider)
        .then(() => {
            this.router.navigate(["home"])
            console.log("Successfully logged in!")
            this.token = true
        })
        .catch((err) => {
            alert(err)
            console.log(err)
        })
    }


    //FORM BUILDER

    buildForm = this.fb.group({
        auth: this.fb.group({
            email:["", Validators.required],
            password:["", Validators.required]
        }),
        rePassword:["", Validators.required],
        jmbg:["", Validators.required],
        city:["", Validators.required],
        name:["", Validators.required],
        typeOfUser:["", Validators.required],
        surname: ["", Validators.required],
        department: []
            // depName: [],
            // depSbj: [],
            // yearOfStudy:[]
    })
}