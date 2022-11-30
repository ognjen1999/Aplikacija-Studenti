import { Injectable } from "@angular/core";
import { deleteDoc, doc, addDoc, updateDoc, getDocs, Firestore, collection, collectionData } from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Department } from "../shared/departments";



@Injectable({providedIn:"root"})
export class DepartmentService{

    constructor(private firestore:Firestore, private fb:FormBuilder){}
    Departments:string = "Departments";
    servers:any[]=[]

    removeValue(val:any){
        val.splice()
    }

    addDepartment(form:any){
    const dbInstance = collection(this.firestore, this.Departments)
    return addDoc(dbInstance, form)
    .then(() => {
    alert("Department Added Successfuly!")
    })
    .catch((err) => {
    console.log(err.message)
    })
}

getDepartments(){
  const dbInstance = collection(this.firestore, "Departments")
  return collectionData(dbInstance, {idField:"id"}) as Observable<Department[]>
}

    removeDepartment(id:string){
      const departmentForDelete = doc(this.firestore, "Departments/" + id)
      return deleteDoc(departmentForDelete)
    }
      updateDepartment(form:any, id:string){

        if(form.valid){
          const dataToUpdate = doc(this.firestore, this.Departments, id)
            updateDoc(dataToUpdate, {
            depName: form.value.depName,
            depSbj: form.value.depSbj,
            yearOfStudy: form.value.yearOfStudy,
          })
          .then(() => {
            console.log("Department Updated!");
          })
          .catch((err) => {
            console.log(err)
          })
        }
        else{
          alert("Something went wrong!")
        }
      }


      departmentFormBuilder = this.fb.group({
        depName:["", Validators.required],
        yearOfStudy:["", Validators.required],
        depSbj: new FormArray([
          new FormControl(null, Validators.required)
        ])
      })

      get departmentSubject(){
        return this.departmentFormBuilder.get("depSbj") as FormArray;
      }

      get departmentSubjectForEdit(){
        return this.departmentFormBuilder.get("depSbj") as FormArray;
      }

      addSubjectField(){
        this.departmentSubject.push(new FormControl(null, Validators.required))
      }
    
      addSubjectFieldInEdit(){
        this.departmentSubjectForEdit.push(new FormControl(null, Validators.required))
      }



      removeSubjectField(){
       return this.departmentSubject.length !== 1? this.departmentSubject.removeAt(this.departmentSubject.length-1) : this.departmentSubject
      }

      removeSubjectFieldForEdit(){
       return this.departmentSubjectForEdit.length !== 1? this.departmentSubject.removeAt(this.departmentSubject.length-1) : this.departmentSubject
      }
}