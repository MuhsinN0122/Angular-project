import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://trainingapi.ridewaretech.com'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // getData(): Observable<any> {
  //   return this.http.post<any>('/User/Login');
  // }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/Login`, data);
  }

  headers(token :any){
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  getCompanyInfo(data: any , token: any){
    let headers = this.headers(token);
    return this.http.post<any>(`${this.apiUrl}/Company/GetCompanyInfo`, data,{headers});
  }
  updateCompany(data: any, token: any){
    let headers = this.headers(token);
    return this.http.post<any>(`${this.apiUrl}/Company/UpdateCompany`, data,{headers});
  }

  
  createEmployee(data:any,token:any){
    let headers = this.headers(token);
    return this.http.post<any>(`${this.apiUrl}/Employee/CreateEmployee`, data,{headers});
  }

  updateEmployee(data:any,token:any){
    let headers = this.headers(token);
    return this.http.post<any>(`${this.apiUrl}/Employee/UpdateEmployee`, data,{headers});
  }

  getAllEmployees(data:any,token:any){
    let headers = this.headers(token);
    return this.http.post<any>(`${this.apiUrl}/Employee/GetAllEmployees`, data,{headers});
  }

  getAllCurrency(data:any,token:any){
    let headers = this.headers(token);
    return this.http.post<any>(`${this.apiUrl}/Company/GetAllCurrency`, data,{headers});
  }

}

