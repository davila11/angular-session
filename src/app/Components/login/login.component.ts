import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;

  constructor(private FormB: FormBuilder) {

    this.formLogin = FormB.group({
      emailUser:['',[Validators.required, Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)]],
      password:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

}
