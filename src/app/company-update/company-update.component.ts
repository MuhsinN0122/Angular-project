import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent {
  company = {
    companyName: '',
    shortName: '',
    contactPerson: '',
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    email: '',
    phoneNumber1: '',
    phoneNumber2: '',
    vatNo: '',
    crNo: '',
    currency: ''
  };
  companyDetails:any;data:any;
  currencies:any;

  constructor(private api : ApiService,private router : Router) { }
  ngOnInit(){
    this.data = {
      "searchKeyword": "",
      "pageIndex": 0,
      "pageSize": 0,
      "id": sessionStorage.getItem('companyId')
    }
    let data1 = {
      "searchKeyword": "",
      "pageIndex": 0,
      "pageSize": 0
    }
    this.api.getAllCurrency(data1,sessionStorage.getItem('authToken')).subscribe((data)=>{
      this.currencies = data.data.result;
    this.api.getCompanyInfo(this.data,sessionStorage.getItem('authToken')).subscribe((data)=>{
      // console.log(data);
      this.company = {
        companyName: data.data.result[0].name,
        shortName: data.data.result[0].shortName,
        contactPerson: '',
        addressLine1: data.data.result[0].addressLine1,
        addressLine2: data.data.result[0].addressLine2,
        zipCode: data.data.result[0].zipCode,
        email: data.data.result[0].emailId,
        phoneNumber1: data.data.result[0].phoneNo1,
        phoneNumber2: data.data.result[0].phoneNo2,
        vatNo: data.data.result[0].vatNo,
        crNo: data.data.result[0].crNo,
        currency: data.data.result[0].currencyId
      };
    })
  })
  }
  updateCompany(){
    let data={
      "id": sessionStorage.getItem('companyId'),
      "name": this.company.companyName,
      "shortName": this.company.shortName,
      "contactPersonName": this.company.contactPerson,
      "addressLine1": this.company.addressLine1,
      "addressLine2": this.company.addressLine2,
      "zipCode": this.company.zipCode,
      "emailId": this.company.email,
      "phoneNo1": this.company.phoneNumber1,
      "phoneNo2": this.company.phoneNumber2,
      "vatNo": this.company.vatNo,
      "crNo": this.company.crNo,
      "currencyId": Number(this.company.currency)
    }
    this.api.updateCompany(data,sessionStorage.getItem('authToken')).subscribe((data)=>{
      if(data.isValid==true){
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Company details updated successfully!',
        showConfirmButton: true,
        timer: 2000
      });
      this.router.navigateByUrl('/home')
    }else{
      Swal.fire({
        title: 'Error!',
        text: data["errorMessages"][0],
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Close'
      });
    }
    });
  }
}
