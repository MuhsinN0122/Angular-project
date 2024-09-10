import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
addOrUpdate : any;employeesList: any;isLoading: boolean = false;
constructor(private api: ApiService,private router : Router ){}
ngOnInit(){
  let data = {
    "searchKeyword": "",
    "pageIndex": 0,
    "pageSize": 0
  }
  this.isLoading = true;
  this.api.getAllEmployees(data,sessionStorage.getItem('authToken')).subscribe((data)=>{
    this.isLoading = false;
    this.employeesList = data;
  },(error)=>{
    this.isLoading = false;
    console.log(error,"error")
    Swal.fire({
      title: 'Error!',
      text: error.title,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Close'
    });
  })
}
editEmployee(employee: any){
  sessionStorage.setItem('empId',employee.id);
  sessionStorage.setItem('empFirstName',employee.firstName);
  sessionStorage.setItem('employeeCode',employee.employeeCode);
  sessionStorage.setItem('empMiddleName',employee.middleName);
  sessionStorage.setItem('empLastName',employee.lastName);
  sessionStorage.setItem('empOfficeContactNo',employee.officeContactNo);
  sessionStorage.setItem('empOfficeEmailId',employee.officeEmailId);
  sessionStorage.setItem('empProfilePhotoName',employee.profilePhotoName);
  sessionStorage.setItem('empRelievingOn',employee.relievingOn);
  sessionStorage.setItem('empReportingToId',employee.reportingToId);
  sessionStorage.setItem('empReportingToName',employee.reportingToName);
  sessionStorage.setItem('empResignationOn',employee.resignationOn);
  sessionStorage.setItem('empUserId',employee.userId);
  this.router.navigateByUrl('/employeeConfig');
}
deleteEmployee(index:any){
  this.employeesList.data.result.splice(index,1);
}
addEmployee(){
  sessionStorage.setItem('empId',"");
  sessionStorage.setItem('empFirstName',"");
  sessionStorage.setItem('employeeCode',"");
  sessionStorage.setItem('empMiddleName',"");
  sessionStorage.setItem('empLastName',"null");
  sessionStorage.setItem('empOfficeContactNo',"");
  sessionStorage.setItem('empOfficeEmailId',"");
  sessionStorage.setItem('empProfilePhotoName',"");
  sessionStorage.setItem('empRelievingOn',"");
  sessionStorage.setItem('empReportingToId',"");
  sessionStorage.setItem('empReportingToName',"");
  sessionStorage.setItem('empResignationOn',"");
  sessionStorage.setItem('empUserId',"");
  this.router.navigateByUrl('/employeeConfig');
}
}
