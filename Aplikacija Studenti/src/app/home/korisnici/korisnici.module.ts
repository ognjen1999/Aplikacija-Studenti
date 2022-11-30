import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
    declarations:[
    UserInfoComponent
  ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class KorisniciModule{}