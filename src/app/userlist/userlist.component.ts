import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { constants } from '../../constants';
import { environment } from '../../environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userList$ = new BehaviorSubject([]);
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList = () => {
    this.http.get(environment.apiUrl + constants.getAllUsersUrl).subscribe(response => {
      if (response['success']) {
        this.userList$.next(response['listOfVendors']);
      }
    });
  }
  toggleCheckinStatus = (userId, currentStatus, i, event) => {
    event.stopPropagation();
    this.http.post(`${environment.apiUrl}${constants.toggleCheckInStatus}`, {
      userId: userId,
      checkedIn: !currentStatus
    }).subscribe(response => {
      if (response['success']) {
        let userLists = this.userList$.getValue();
        userLists[i].vendorCheckinStatus = !currentStatus;
        this.userList$.next(userLists);
      } else {
        alert('falied to update checkin status');
      }
    })
  }
}
