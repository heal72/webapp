import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { constants } from '../../constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  userId: string;
  userDetails$: Observable<any>;
  errorMessage: string;
  userDetailsDataKeys: Array<any>;
  orders$: Observable<any>;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getUserIdFromUrl().subscribe(userId => {
      this.userId = userId.toString();
    });
  }

  ngOnInit() {
    this.getUserDetails(this.userId);
    this.getUserOrders(this.userId);
  }

  getUserDetails = (userId) => {
    this.http.get(`${environment.apiUrl}${constants.getUserDetails}${userId}`).subscribe(response => {
      if (response['success']) {
        this.errorMessage = '';
        this.userDetails$ = of(response['userDetails']);
        this.userDetailsDataKeys = Object.keys(response['userDetails']);
      } else {
        this.errorMessage = response['message'];
      }
    })
  }

  getUserOrders = (userId) => {
    this.http.get(`${environment.apiUrl}${constants.getOrders}${userId}`).subscribe(response => {
      if (response['success']) {
        this.orders$ = of(response['orders']);
      }
    });
  }
  getUserIdFromUrl = () => {
    return new Observable(observer => {
      this.route.params.subscribe(params => {
        observer.next(params.userId);
      });
    });
  };
}
