import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class IUser {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;

  constructor(newName='',newAge=0, newGender='', newEmail='', newPassword=''){
    this.name= newName;
    this.age=newAge;
    this.gender=newGender;
    this.email=newEmail;
    this.password=newPassword;
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
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
      email: [null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
    });
  }

  ngOnInit(): void { }

  createUser(event: Event) {
    event.preventDefault();
    //Create the user and clean all inputs
    if (this.formsigIn.valid) {
      const user = this.formsigIn.value;
      if (JSON.parse(localStorage.getItem('users') as string)) {
        this.userList = JSON.parse(localStorage.getItem('users') as string);
      };
      // console.log("New user",user)
      if (this.userList) {
        let validEmail = this.userList.find((element) => element.email === user.email);
        if (validEmail) this.confirm = true;
        else {
          this.userList.push(user);
          localStorage.setItem('users', JSON.stringify(this.userList))
          this.formsigIn.reset();
        }
      }
    }
  }

  get emailValue() {
    return this.formsigIn.get('email');
  }

  getErrorEmail() {
    return this.emailValue?.hasError('required') ? 'Email is required'
      : this.emailValue?.hasError('pattern') ? 'Not a valid email address'
        : '';
  }
}