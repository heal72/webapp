import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  status;
  from;
  to;
  totalCount = 100;

  constructor() { }

  ngOnInit() {
    var N = this.totalCount;
    let a  = Array.apply(null, {length: N}).map(Number.call, Number);
    console.log(a);
  }

  getOrdersPagination = () => {

  }
}
