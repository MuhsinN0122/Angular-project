import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isHomeRoute: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = this.router.url === "/home";
      }
    });
  }
  logout() {
    this.router.navigate(['/login']);
  }
  home(){
    this.router.navigate(['/home']);
  }
}
