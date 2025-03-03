import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CATEGORY_DATA } from './model/mock-customers';
import { Customer } from './model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    return of(CATEGORY_DATA);
  }
}
