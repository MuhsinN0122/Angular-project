import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import {ngOnIni}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(public router:RouterModule){}
  title = 'angular_crud';
}

