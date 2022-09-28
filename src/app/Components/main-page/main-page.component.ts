import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  

  dataUser:string;

  constructor(private activateRedirect: ActivatedRoute) {
    this.dataUser='';

   }

  ngOnInit(): void {
    this.activateRedirect.params.subscribe(params =>{
      this.dataUser = params['dataUser']

  })
}
}