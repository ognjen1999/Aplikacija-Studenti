import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/servers/department.service';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  constructor(private fb:FormBuilder, private departmentService:DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  departmentSubject = this.departmentService.departmentSubject;
  findDepartment:string;
  departments:any[] = []
  bgShadow:boolean = false;
  _editDepartmentModal:boolean = false;
  _addDepartmentModal:boolean = false;
  takenDepartmentForEdit:any;
  takendDepartmentObjectForEdit:any;

  editDepartmentModal(id:any){
    this.bgShadow = true;
    this._editDepartmentModal = true;
    this.takenDepartmentForEdit = id
    this.takendDepartmentObjectForEdit = this.departments.find(x => x.id == this.takenDepartmentForEdit)

  this.DepartmentFormBuilderEdit = this.fb.group({
      depName: [this.takendDepartmentObjectForEdit.depName] ,
      depSbj: new FormArray([
        new FormControl(this.takendDepartmentObjectForEdit.depSbj)
      ]),
      yearOfStudy: [this.takendDepartmentObjectForEdit.yearOfStudy]
    })
  }
  addDepartmentFieldForEdit(){
    this.takendDepartmentObjectForEdit.depSbj.push(new FormControl("", Validators.required))
  }

  removeDepartmentFieldForEdit(){
    this.takenDepartmentForEdit.depSbj.removeAt(this.takenDepartmentForEdit.depSbj - 1)
  }
 closeEditDepartmentModal(){
    this.bgShadow = false;
    this._editDepartmentModal = false;
  }

  activeAddDepartmentModal(){
    this.bgShadow = true;
    this._addDepartmentModal = true;
  }
  closeAddDepartmentModal(){
    this.bgShadow = false;
    this._addDepartmentModal = false;
  }
  updateDepartment(form:any):void{
    this.departmentService.updateDepartment(form, this.takenDepartmentForEdit)
  };

  deleteDepartment(id:any){
    let confirmRemoving = confirm("Permantly remove this department ?")

    if(confirmRemoving) this.departmentService.removeDepartment(id)
  }

getDepartments = () =>{
  this.departmentService.getDepartments().subscribe(val => this.departments = val)
}

  

  addNewDepartment(form:any){
    
    if(!form.valid){
      alert("Something went wrong!")
    }
    else{
      this.departmentService.addDepartment(form.value)
    }
  }

   DepartmentFormBuilderAdd = this.departmentService.departmentFormBuilder
   DepartmentFormBuilderEdit = this.departmentService.departmentFormBuilder


  //Pegination
  POSTS:any;
  page:number = 1;
  count:number = 0;
  tableSize = 6;

  onTableDataChange(event:any){
    this.page = event;
    this.departments;
  }

  inputArray = [""]
  inputProperty:string = "";

  addSomeInput(){
    this.departmentService.addSubjectField()
  }

  removeInputField(){
    this.departmentService.removeSubjectField()
  }

  removeInputFieldForEdit(){
    this.departmentService.removeSubjectField()
  }

  perventWhiteSpace(event){
    if(event.keyCode == 32 || event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 191 || event.keyCode == 189 || event.keyCode == 107 || event.keyCode == 109){
      event.preventDefault()
    } return
  }
}