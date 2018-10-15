import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/routeGuards/authGuard';
import { TokenInterceptor } from '../services/interceptors/tokenInterceptor';
import { AvailabilityIndicator } from './directives/availabilityIndicator';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes = [
  { path: '', component: LoginComponent },
  { path: 'vendors', component: UserlistComponent, canActivate: [ AuthGuard ] },
  { path: 'vendor/:userId', component: UserdetailsComponent, canActivate: [ AuthGuard ] },
  { path: 'allOrders/:pageNo', component: AllOrdersComponent, canActivate: [ AuthGuard ] },
  { path: 'orderDetails/:orderId', component: OrderDetailsComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    LoginComponent,
    AvailabilityIndicator,
    UserdetailsComponent,
    AllOrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
