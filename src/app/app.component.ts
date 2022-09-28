import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './Components/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto';

 

constructor(private route: Router){

}
  onClick(pRoute:string){
    this.route.navigate([pRoute])
  }

}
