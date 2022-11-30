import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ServerService } from 'src/app/servers/server.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute, private serverService:ServerService) {
    
   }
   selectedUserID:string;
   selectedTypeOfUser:string;
   userObj:any;
  ngOnInit() {
    this.selectedUserID = this.route.snapshot.paramMap.get("id")
    this.selectedTypeOfUser = this.route.snapshot.paramMap.get("name")
    this.getUser()
  }
  

  async getUser(){
    const user$ = this.serverService.getUsers(this.selectedTypeOfUser)
    return this.userObj = await (await firstValueFrom(user$)).find(x => x.id == this.selectedUserID)
  }

  showMore = false;
  showDepartmentInfo = false;

  toggleShowMore = () => {
    this.showMore = !this.showMore
    this.showDepartmentInfo = !this.showDepartmentInfo
  }
  getNextUser(){
    
  }
  getPreviousUser(){

  }
}
