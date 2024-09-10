import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-configuration',
  templateUrl: './employee-configuration.component.html',
  styleUrls: ['./employee-configuration.component.css']
})
export class EmployeeConfigurationComponent {
  employee = {
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    gender: '',
    permanentAddress: '',
    currentAddress: '',
    isCurrentSameAsPermanent: false,
    email: '',
    mobileNo: '',
    otherContactNo: '',
    employeeCode: '',
    joiningOn: ''
  };
  isCurrentSameAsPermanent: Boolean = false; empData: any; employeeDetails: any
  constructor(private api: ApiService, private router: Router) { }
  ngOnInit(){
    if(sessionStorage.getItem('empId')){
    this.employee = {
      firstName: String(sessionStorage.getItem('empFirstName')),
      lastName: String(sessionStorage.getItem('empLastName')),
      middleName: String(sessionStorage.getItem('empMiddleName')),
      birthDate: '',
      gender: '',
      permanentAddress: '',
      currentAddress: '',
      isCurrentSameAsPermanent:false,
      email: '',
      mobileNo: '',
      otherContactNo: '',
      employeeCode: String(sessionStorage.getItem('employeeCode')),
      joiningOn: ''
    };
  }
  }
  addOrUpdateEmployee() {
    // console.log(this.employeeForm.value);
    let nullArray = ["null", undefined, '', null];
    if (nullArray.includes(sessionStorage.getItem('empId'))) {
      //add
      this.empData = {
        "firstName": this.employee.firstName,
        "lastName": this.employee.lastName,
        "middleName": this.employee.middleName,
        "birthDate": this.employee.birthDate,
        "gender": Number(this.employee.gender),
        "parmenantAddress": this.employee.permanentAddress,
        "currentAddress": this.employee.currentAddress,
        "isCurrentSameAsParmenantAddress": this.employee.isCurrentSameAsPermanent,
        "personalEmailId": this.employee.email,
        "personalMobileNo": this.employee.mobileNo,
        "otherContactNo": this.employee.otherContactNo,
        "employeeCode": this.employee.employeeCode,
        "joiningOn": this.employee.joiningOn
      }
      if (this.employee.isCurrentSameAsPermanent == true) {
        this.empData["currentAddress"] = this.employee.permanentAddress;
      }
      this.api.createEmployee(this.empData, sessionStorage.getItem('authToken')).subscribe((data) => {
        // console.log("emp details", data)
        // this.employeeDetails = data;
        if (data.data.isValid == false) {
          // Swal.fire(data)
          Swal.fire({
            title: 'Error!',
            text: data["errorMessages"][0],
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Close'
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.successMessages[0],
            showConfirmButton: true,
            timer: 2000
          });
          this.router.navigateByUrl('/employees');
        }
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.title,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close'
        });
      })
    }else{
      this.empData = {
        "id": sessionStorage.getItem('empId'),
        "firstName": this.employee.firstName,
        "lastName": this.employee.lastName,
        "middleName": this.employee.middleName,
        // "birthDate": this.employee.birthDate,
        // "gender": Number(this.employee.gender),
        // "parmenantAddress": this.employee.permanentAddress,
        // "currentAddress": this.employee.currentAddress,
        // "isCurrentSameAsParmenantAddress": this.employee.isCurrentSameAsPermanent,
        // "personalEmailId": this.employee.email,
        // "personalMobileNo": this.employee.mobileNo,
        // "otherContactNo": this.employee.otherContactNo,
        "employeeCode": this.employee.employeeCode,
        // "joiningOn": this.employee.joiningOn
      }
      this.api.updateEmployee(this.empData,sessionStorage.getItem('authToken')).subscribe((data)=>{
        // console.log("emp details", data)
        // this.employeeDetails = data;
        if (data.data.isValid == false) {
          // Swal.fire(data)
          Swal.fire({
            title: 'Error!',
            text: data["errorMessages"][0],
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Close'
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.successMessages[0],
            showConfirmButton: true,
            timer: 2000
          });
          this.router.navigateByUrl('/employees');
        }
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.title,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close'
        });
      })
    }
  }
}
