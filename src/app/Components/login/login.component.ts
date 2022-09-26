import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private FormB: FormBuilder) {
    this.formLogin = FormB.group({
      emailUser: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  confirmUser($event: Event) {
    $event.preventDefault();
    const user = this.formLogin.value;
    let localUser = JSON.parse(localStorage.getItem('users') as string);
    let validEmail: boolean = false;
    let validPassword: boolean =false;

    for (let i = 0; i < localUser.length; i++) {
      if (localUser[i].email === user.emailUser) {
        validEmail = true;
      } else {
        validEmail = false;
      }

      console.log('validando Email', validEmail);
    }

    for (let i = 0; i < localUser.length; i++) {
      if(validEmail){
        if (localUser[i].password === user.password) {
          validPassword = true;
        } else {
          validPassword = false;
        }
      }
      console.log('Validando password', validPassword)
    }



    // const vUser= localUser.find((element:{email:string}) => element.email === user.emailUser);
    // console.log(localUser.includes(vUser));

    // element.email === user.emailUser

    // console.log(validEmail)

    //   else validEmail= false;
    //   console.log(validEmail)
    // }

    // for(const element of localUser){
    //   if(element.password === user.password){
    //     validPassword=true;
    //     // console.log(validPassword)
    //   }
    //   else validPassword= false;
    //   console.log(validPassword)
    // }

    //   let validUser = JSON.parse(localStorage.getItem('users',));

    // console.log(validUser);
  }
}
