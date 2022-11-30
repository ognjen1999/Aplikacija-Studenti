export class Department{
    id:any;
    depName:any;
    depSbj:any;
    yearOfStudy:any;
description: any;
    constructor(depName:any, depSbj:any ,yearOfStudy:any, id:any){
        this.depName = depName;
        this.depSbj = depSbj;
        this.yearOfStudy = yearOfStudy;
        this.id = id;
    }
}