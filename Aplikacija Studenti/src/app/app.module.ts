import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { SignupComponent } from './authentification/signup/signup.component';
import {AuthService} from "./servers/authentification.service";
import {guardService} from "./servers/guard.service";
import {KorisniciComponent} from "./home/korisnici/korisnici.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ServerService} from "./servers/server.service";
import { HttpClientModule } from '@angular/common/http';
import {KorisniciModule} from "./home/korisnici/korisnici.module";
import {HomeComponent} from "./home/home.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgxPaginationModule } from 'ngx-pagination';
import { YGuard } from './y.guard';
import { UserInfoComponent } from './home/korisnici/user-info/user-info.component';
import { DepartmentsComponent } from './home/departments/departments.component';
import { DepartmentService } from './servers/department.service';
import { FilterPipe } from './shared/filter.pipe';
import { NgxMaskModule } from 'ngx-mask';

const appRoutes:Routes= [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"home/korisnici/:id/:name", component:KorisniciComponent},
  {path:"home", component: HomeComponent, canActivate:[YGuard]},
  {path:"home/userInfo/:id/:name", component:UserInfoComponent, canActivate:[YGuard]},
  {path:"home/departments", component:DepartmentsComponent, canActivate:[YGuard]},
  {path:"**", component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    KorisniciComponent,
    PageNotFoundComponent,
    HomeComponent,
    DepartmentsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    KorisniciModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthService, guardService, ServerService, DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }