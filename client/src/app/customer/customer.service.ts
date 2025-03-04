import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { CATEGORY_DATA } from './model/mock-customers';
import { Customer } from './model/Customer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/customer';

  getCustomers(): Observable<Customer[]> {
    //return of(CATEGORY_DATA);
    return this.http.get<Customer[]>(this.baseUrl).pipe(
      catchError(this.handleError) // Maneja errores en la solicitud
    );
  }

  saveCustomer(customer: Customer): Observable<Customer> {
   const { id } = customer;
         const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
         return this.http.put<Customer>(url, customer).pipe(
          catchError(this.handleError) // Maneja errores en la solicitud
        );
  }

  deleteCustomer(idCustomer : number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idCustomer}`).pipe(
      catchError(this.handleError) // Maneja errores en la solicitud
    );
  }

  /**
   * Maneja errores de las solicitudes HTTP.
   * @param error El error recibido.
   * @returns Un Observable que emite un mensaje de error.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error en la solicitud.';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente (por ejemplo, red o conexión)
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 400 && error.error) {
        // Si el backend devuelve un mensaje de error, lo usamos
        errorMessage = error.error;
      } else {
        errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
      }
    }

    // Propaga el mensaje de error
    return throwError(() => new Error(errorMessage));
  }
  
}
