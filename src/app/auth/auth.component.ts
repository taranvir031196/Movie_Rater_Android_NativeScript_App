import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../item/api.service';
import { Auth } from "../models/Auth";
import {getString, setString} from "tns-core-modules/application-settings";
import { SnackBar } from 'nativescript-material-snackbar';


@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'], 
  moduleId: module.id
})

export class AuthComponent implements OnInit {

  public registerMode:boolean;
  public auth: Auth;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerMode = false;
    const myToken = getString("mr-token");
    // if(myToken){
    //   this.router.navigate(['/items'])
    // }else{
      this.auth = {username:"", password: ""};  
  //  }
      
  }

  submitForm(){
    if(this.registerMode){
      this.apiService.registerUser(this.auth).subscribe(
        (results:any)=>{
          console.log(results);
          setString("mr-token", results.token);
          this.router.navigate(['/items'])
        }, 
        err=>{
          console.log(err);
          const snackbar = new SnackBar();
          snackbar.simple("Please Enter All Credentials to Register")
        }
      )
    }else{
      this.loginFunction();
    }
  }

loginFunction(){
this.apiService.loginUser(this.auth).subscribe(
  (results:any)=>{

    console.log(results);
    setString("mr-token", results.token);
    this.router.navigate(['/items'])
  }, 
  err=>{
    console.log(err);
    const snackbar = new SnackBar();
    snackbar.simple(err.error.non_field_errors[0]);
    }
  )
 }
}
