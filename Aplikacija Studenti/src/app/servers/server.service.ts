import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { AuthService } from "./authentification.service";
import { Korisnik } from "../shared/models/korisnik";
import { Firestore, addDoc, deleteDoc, updateDoc, doc, getDocs, collection, CollectionReference, DocumentData, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Department } from "../shared/departments";
import { DepartmentService } from "./department.service";

@Injectable()
export class ServerService {

  servers: any = []

  constructor(
    private firestore: Firestore,
    private departmentService:DepartmentService
  ) { }

  addUser(form: Korisnik[], typeOfUser: string) {
    const dbInstance = collection(this.firestore, typeOfUser)
    addDoc(dbInstance, form)
      .then(() => {
        alert("User Added!")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  updateUser(form: any, typeOfUser ,id: string) {
    let findDepartmentsObj = this.departmentService.getDepartments()
    

    // if (form.auth.password === form.confirmPass) {
      const dataToUpdate = doc(this.firestore, typeOfUser, id)
      updateDoc(dataToUpdate, {
        name: form.name,
        surname: form.surname,
        email: form.auth.email,
        password: form.auth.password,
        rePassword: form.rePassword,
        city: form.city,
        jmbg: form.jmbg,
        depName: form.department.depName,
        depSbj: form.department.depSbj,
        yearOfStudy: form.department.yearOfStudy
      })
        .then((val) => {
          console.log("User Updated!", val);
        })
        .catch((err) => {
          console.log(err)
        })
    // }
    // else {
    //   alert("Passwords doesn't match")
    // }
  }

  getUsers(typeOfUser){
    const dbInstance = collection(this.firestore, typeOfUser)
    return collectionData(dbInstance, {idField:"id"}) as Observable<Korisnik[]>
  }

  removeUser(id:string, typeOfUser){
    let dbInstance = doc(this.firestore, typeOfUser + "/" + id)
    return deleteDoc(dbInstance)
  }

  perventInputWhiteSpace(event){
    if(event.keyCode == 32 && event.target.selectionStart === 0){
      event.preventDefault()
    }return
  }

}