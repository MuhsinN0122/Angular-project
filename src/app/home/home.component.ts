import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private api: ApiService, private router: Router) { }
  authToken: any; companyInformation: any;
  logoUrl: string = ''; companyLogo: any;
  ngOnInit() {
    this.authToken = sessionStorage.getItem('authToken');
    let data = {
      "searchKeyword": "string",
      "pageIndex": 0,
      "pageSize": 0,
      "id": sessionStorage.getItem('companyId'),
    }

    this.api.getCompanyInfo(data, this.authToken).subscribe((data) => {
      console.log(data);
      this.companyInformation = data;
    })



  }
  updateCompany() {
    this.router.navigateByUrl('/companyUpdate');
  }
  viewEmployees() {
    this.router.navigateByUrl('/employees');
  }
}
