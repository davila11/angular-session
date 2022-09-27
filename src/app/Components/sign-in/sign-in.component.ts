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
  confirm: boolean;


  constructor(private FormB: FormBuilder) {

    this.userList = [];
    this.confirm = false;

    this.formsigIn = this.FormB.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/), this.checkEmail]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]]
    });
  }

  ngOnInit(): void {
  }

  createUser(event: Event) {
    event.preventDefault();
    //Create the user and clean all inputs
    if (this.formsigIn.valid) {
      const user = this.formsigIn.value;
      const localInfo = JSON.parse(localStorage.getItem('users') as string);
      console.log(user)
      // this.userList.push(user)
      localInfo.push(user)
      console.log("LocalInfo", localInfo)
      localStorage.setItem("users", JSON.stringify(localInfo))
      this.formsigIn = this.FormB.group({
        name: [null, [Validators.required]],
        age: [null, [Validators.required]],
        gender: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)]],
        password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]]
      });
    }
  }

  checkEmail(control: { value: string }) {
    let enteredEmail = control.value;
    const localInfo = JSON.parse(localStorage.getItem('users') as string);
    let confirmUser = localInfo.find(((element: { email: string; }) => element.email === enteredEmail));
    return (confirmUser.email === enteredEmail) && enteredEmail
      ? { requirements: true }
      : null;
  }




  // if (this.formsigIn.valid) {
  //   let confirmUser = localInfo.find(((element: { email: string; }) => element.email === user.email));
  //   if (confirmUser) {
  //     if (confirmUser === user.email) {
  //       this.confirm = true;
  //     } else {
  //       this.confirm = false;
  //       localInfo.push(user);
  //       localStorage.setItem("users", JSON.stringify(localInfo))
  //     }
}


