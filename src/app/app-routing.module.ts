import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeConfigurationComponent } from './employees/employee-configuration/employee-configuration.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path:'', component:CompanyUpdateComponent},
  { path: 'login', component: LoginComponent },
  { path:'home', component : HomeComponent},
  { path:'companyUpdate', component:CompanyUpdateComponent},
  { path:'employees', component:EmployeesComponent},
  { path:'employeeConfig', component : EmployeeConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
