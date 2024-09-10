import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private api : ApiService , private router: Router) { }
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  onSubmit() {
    let data = {
      "username": this.username,
      "clientId": "ERPWebApp",
      "password": this.password,
    }
    this.api.login(data).subscribe((data)=>{
      if(data["isValid"]==false){
        Swal.fire({
          title: 'Error!',
          text: data["errorMessages"][0],
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close'
        });
      }else{
        sessionStorage.setItem('authToken',data["data"].token);
        sessionStorage.setItem('companyId',data.data.companyId);
        sessionStorage.setItem('id',data.data.id)
        sessionStorage.setItem('employeeId',data.data.employeeId);
        sessionStorage.setItem('refreshToken',data.data.refreshToken);
        this.router.navigateByUrl('/home');
      }
    })

  }
}

