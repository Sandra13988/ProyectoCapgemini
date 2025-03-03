import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CATEGORY_DATA } from './model/mock-customers';
import { Customer } from './model/Customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/category';

  getCustomers(): Observable<Customer[]> {
    //return of(CATEGORY_DATA);
    return this.http.get<Customer[]>(this.baseUrl);
  }

  saveCustomer(customer: Customer): Observable<Customer> {
   const { id } = customer;
         const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
         return this.http.put<Customer>(url, customer);
  }

  deleteCustomer(idCustomer : number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idCustomer}`);
  }
  
}
