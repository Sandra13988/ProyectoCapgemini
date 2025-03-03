import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../model/Customer';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})

export class CustomerListComponent implements OnInit{
  //dataSource para la tabla de clientes
  dataSource = new MatTableDataSource<Customer>();
  //columnas de la tabla
  displayedColumns: string[] = ['id', 'name', 'action'];
  constructor(
    //pasarle el servicio al constructor para poder usarlo
    private customerService: CustomerService,
  ){}

  //Cuando el componente se inicia, escucha el servicio de clientes
  //si este contiene datos los imprime en la tabla
  ngOnInit(): void { 
    this.customerService.getCustomers().subscribe(
      categories => this.dataSource.data = categories
    );
  }
}
