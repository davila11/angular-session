import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface IUser {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formsigIn: FormGroup;
  userList: IUser[];
  confirm:boolean;


  constructor(private FormB: FormBuilder) {

    this.userList = [];
    this.confirm =false;

    this.formsigIn = FormB.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]]

    })
  }

  ngOnInit(): void {
  }

  createUser(event: Event) {
    event.preventDefault();
    const user = this.formsigIn.value;
    let localInfo = JSON.parse(localStorage.getItem('users')as string);

    console.log(user)

    if( this.formsigIn.valid ) {
      let confirmUser = localInfo.find(((element: { email: string; }) => element.email === user.email));
      if(confirmUser){
        if(confirmUser === user.email){
         this.confirm = true;
        }else{
          this.confirm = false;
          localInfo.push(user);
          localStorage.setItem("users", JSON.stringify(localInfo))
        }
      } 
    }
  }
}
