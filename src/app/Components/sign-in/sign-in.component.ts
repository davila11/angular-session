import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formsigIn:FormGroup;

  constructor(private FormB: FormBuilder ) { 

    this.formsigIn = FormB.group({
      name:['',Validators.required],
      age:['',Validators.required],
      gender:['',Validators.required],
      email:['',Validators.required,Validators.pattern(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)],
      password:['',Validators.required]
      
    })
  }

  ngOnInit(): void {
  }

}
