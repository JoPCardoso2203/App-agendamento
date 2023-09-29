import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public navegate = [
    {
      title: 'Agendamentos',
      path: 'Home',
      icon: 'fas fa-home'
    },
    {
      title: 'Transportadora',
      path: 'Transportadora',
      icon: 'fa fa-truck'
    },
    {
      title: 'Motorista / Veículo',
      path: 'Motorista',
      icon: 'fa fa-address-card'
    }
  ];

  public sidebarShow: boolean = false;

  constructor(private router: Router) { }

  Redirecionar(path: string){
    this.sidebarShow = false;
    this.router.navigate([path]);
  }
}