import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {



  @Output () userData:EventEmitter<IUser>

  
  userList: IUser[];
  formLogin: FormGroup;

  constructor(private FormB: FormBuilder, private router: Router) {
    this.userData = new EventEmitter();
    this.userList = [];
    this.formLogin = FormB.group({
      emailUser: ['', [Validators.required, Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  confirmUser(event: Event) {
    event.preventDefault();
    if (this.formLogin.valid) {
      const userLog = this.formLogin.value;
      if (JSON.parse(localStorage.getItem('users') as string)) {
        this.userList = JSON.parse(localStorage.getItem('users') as string);
      };
      if (this.userList) {
        let userAccount = this.userList.find((element) => element.email === userLog.emailUser);
        if (userAccount) {
          let validPassword = userAccount.password === userLog.password;
          if (validPassword) {
            this.router.navigate(['main'])

          
       

            // alert(`Tus datos son: \n 
            //   Name: ${userAccount.name} \n
            //   Age: ${userAccount.age} \n
            //   Gender: ${userAccount.gender === "M" ? "Male" : "Female"}`)
          } else alert("Wrong password")
        }
        else alert("Email no encontrado")
      }
    }
  }
}
