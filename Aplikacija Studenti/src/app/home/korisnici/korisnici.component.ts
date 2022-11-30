import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from 'src/app/servers/server.service';
import { firstValueFrom, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/servers/authentification.service';
import { collection, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { DepartmentService } from 'src/app/servers/department.service';
import { Department } from 'src/app/shared/departments';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css'],
  providers: []
},)
export class KorisniciComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private firestore: Firestore,
    private router: Router,
    private authService: AuthService,
    private departmentService:DepartmentService,
    private fb:FormBuilder
  ) { }
  addUserModal: boolean = false;
  editUserModal: boolean = false;
  bgShadow: boolean = false;


  activeAddUserModal() {
    this.addUserModal = true
    this.bgShadow = true
  }

  deActiveAddUserModal() {
    this.addUserModal = false
    this.bgShadow = false
  }

  deActiveEditUserModal() {
    this.editUserModal = false
    this.bgShadow = false
  }

  activeUserName: string;
  activeUserId: string;
  korisniciProfesori: any = [];
  korisniciStudenti: any = [];
  korisnici: any = [];
  pronadjiKorisnika: string;
  userForEditID:string;


  ngOnInit() {
    this.serverService.getUsers("Profesori").subscribe((e) => {
      return this.korisniciProfesori = e
    })
    this.serverService.getUsers("Studenti").subscribe((e) => {
      return this.korisniciStudenti = e
    })
    

    this.getDepartments()
    


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.activeUserName = params.get("name")
      this.activeUserId = params.get("id")





      switch (parseInt(this.activeUserId)) {
        case 1:
          {
            this.getBothUsers()
            break;
          }
        case 2:
          {
            this.serverService.getUsers("Studenti")
            .subscribe((val) => {
             return this.korisnici = val
            })
            break;
          }
        case 3:
          {
            this.serverService.getUsers("Profesori")
            .subscribe((val) => {
              return this.korisnici = val
            })
            break;
          }
        case 4:
          {
            this.navigateToDepartments()
            break;
          }
      }
    })
  }

  preventWhiteSpace(event){
    this.serverService.perventInputWhiteSpace(event)
  }

  navigateToDepartments() {
    this.router.navigate(["home/departments"])
  }

  deleteUser(userId: any) {
    if (this.activeUserName !== "Korisnici") {
      let potvrdi = confirm("Do you want to remove this user ?")

      if (potvrdi) {
        this.serverService.removeUser(userId, this.activeUserName)
      } return;
    }
    else {
      alert("Please go to page ,,Studenti'' or ,,Profesori'' to delete user.")
    }
  }

  openUpdateUserModal(id: string) {
    this.bgShadow = true;
    this.editUserModal = true;
    
    this.userForEditID = id;
    let userObj = this.korisnici.find(x => x.id == id)
    
    
    this.editUserFormBuilder = this.fb.group({
      auth: this.fb.group({
          email:[userObj.auth.email, Validators.required],
          password:[userObj.auth.password, Validators.required]
      }),
      rePassword:[userObj.rePassword, Validators.required],
      jmbg:[userObj.jmbg, Validators.required],
      city:[userObj.city, Validators.required],
      name:[userObj.name, Validators.required],
      typeOfUser:[userObj.typeOfUser, Validators.required],
      surname: [userObj.surname, Validators.required],
      department: [userObj.department]
  })
}

  updateUser(form: any) {
    this.serverService.updateUser(form.value, this.activeUserName, "/" + this.userForEditID)
    
    this.deActiveEditUserModal()
  }

  checkUserInfo(id: string) {
    if (this.activeUserName !== "Korisnici") {
      this.router.navigate(["home/userInfo", id, this.activeUserName])
    }
  }

  //EDITING USER
  editUserFormBuilder = this.authService.buildForm


  getBothUsers() {
   this.korisnici = this.korisniciProfesori.concat(this.korisniciStudenti)
  }

  typeOfUser = ["Studenti", "Profesori"]

  //ADDING USER
  addUserFormBuilder = this.authService.buildForm
   addThisUser(form: any) {
    if (form.value.auth.password == form.value.rePassword) {
      console.log(form.value);
      
      // this.deActiveAddUserModal()
      return this.authService.signUpAndAddUser(form)
    }
    else {
      alert("Passwords are not the same!")
    }
  }

  //PAGINATE

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize = 6;

  onTableDataChange(event: any) {
    this.page = event;
    this.korisnici;
  }

  departments:Department[];

  
  async getDepartments(){
    const data$ = this.departmentService.getDepartments()
    this.departments = await firstValueFrom(data$)
  }

 async getUsersProfesori(){
    const users = this.serverService.getUsers("Profesori")
    return this.korisniciProfesori = await firstValueFrom(users)
  }

 async getUsersStudenti(){
    const users = this.serverService.getUsers("Studenti")
    return this.korisniciStudenti = await firstValueFrom(users)
  }

  //This function is used in edit modal
  

  departmentObj:Department;
  takenValue:string;



  searchUser(){
    if(!this.korisnici || !this.pronadjiKorisnika){
       this.korisnici
       return this.korisnici;
       
    }
    else{
       this.korisnici.filter(user => user.name.toLowerCase().includes(this.pronadjiKorisnika.toLowerCase()))
      return this.korisnici;
      }
  }
}