import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../model/Customer';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
  ){}

  //Cuando el componente se inicia, escucha el servicio de clientes
  //si este contiene datos los imprime en la tabla
  ngOnInit(): void { 
    this.customerService.getCustomers().subscribe(
      categories => this.dataSource.data = categories
    );
  }

  //Funcion para crear un cliente
  createCustomer() {
    //Abre un popup con el componente de edicion de cliente
    //En este caso sin id para que lo cree
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      data: {}
    });

    //Cuando se cierra el popup, se vuelve a cargar la tabla
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editCustomer(customer: Customer) {
    //Abre un popup con el componente de edicion de cliente
    //En este caso con el cliente que se quiere editar
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      data: { customer }
    });

    //Cuando se cierra el popup, se vuelve a cargar la tabla
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
