import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { constants } from './../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginResponse = {
    message: ""
  };
  loginCredentials = {
    username: '',
    password: ''
  };
  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit() {
  }

  loginRequest = () => {
    this.http.post(environment.apiUrl + constants.loginUrl, {
      username: this.loginCredentials.username,
      password: this.loginCredentials.password
    }).subscribe(response => {
      console.log(response);
      if(response['success']) {
        localStorage.setItem('token', response['token']);
        this.router.navigate(['vendors'])
      } else {
        this.loginResponse.message = response['message'];
      }
    } )
  }

}
