import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { constants } from '../../constants';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  status = '';
  from = 0;
  to = 20;
  totalCount;
  itemsPerPage = 20;
  ordersToDisplay$ = [];
  currentPage = 0;
  pagesArray = [];
  nextPageAvailable = false;
  perviousPageAvailable = false;
  loading = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.currentPage = parseInt(params.pageNo);
    })
    this.goToPage(this.status, this.currentPage);
  }

  createPagination = (noOfItems) => {
    let noOfPages = noOfItems / this.itemsPerPage;
    if (noOfItems % this.itemsPerPage > 0) {
      noOfPages++;
    }
    if (this.pagesArray.length === noOfPages) {
      return;
    }
    this.pagesArray = Array.apply(null, { length: noOfPages }).map(Number.call, Number);
  }

  getOrdersPagination = (status, from, to) => {
    this.loading = true;
    this.http.post(`${environment.apiUrl}${constants.getAllOrdersWithStatus}`, { status, from, to }).subscribe(response => {
      this.loading = false;
      if (response['success']) {
        this.totalCount = response['count'];
        this.ordersToDisplay$ = response['orders'];
        this.createPagination(this.totalCount);
        this.nextPageAvailable = to < this.totalCount ? true : false;
        this.perviousPageAvailable = from > 0 ? true : false;
      } else {
        this.totalCount = 0;
      }
    });
  }

  goToPage = (status, pageNo) => {
    const from = pageNo * this.itemsPerPage;
    const to = from + this.itemsPerPage;
    if (from > this.totalCount || this.loading) {
      return;
    }
    this.currentPage = pageNo;
    this.router.navigate([`../${this.currentPage}`], { relativeTo: this.route });
    this.getOrdersPagination(status, from, to);
  }

  nextPage = (status) => {
    if (this.loading || !this.nextPageAvailable) {
      return;
    }
    this.currentPage++;
    this.router.navigate([`../${this.currentPage}`], { relativeTo: this.route });
    const pageNo = this.currentPage;
    const from = pageNo * this.itemsPerPage;
    const to = from + this.itemsPerPage;
    this.getOrdersPagination(status, from, to);
  }

  previousPage = (status) => {
    if (this.loading || !this.perviousPageAvailable){
      return;
    }
    this.currentPage--;
    this.router.navigate([`../${this.currentPage}`], { relativeTo: this.route });
    const pageNo = this.currentPage;
    const from = pageNo * this.itemsPerPage;
    const to = from + this.itemsPerPage;
    this.getOrdersPagination(status, from, to);
  }
}
