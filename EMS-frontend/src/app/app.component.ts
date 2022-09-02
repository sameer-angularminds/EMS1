import { Component, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EMS-frontend';
  productData:any;
  displayedColumns: string[] = ['productName', 'category', 'price', 'date', 'freshness', 'comment','actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog:MatDialog,private apiService:ApiService){
  this.getData();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:"30%"
    }).afterClosed().subscribe(val =>{
      if(val==='Save'){
        this.getData();
      }
    })
  }
  getData(){
    this.apiService.getData().subscribe((data)=>{
      this.productData = data;
      this.dataSource = new MatTableDataSource(this.productData);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
     })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editProduct(row){
    this.dialog.open(DialogComponent, {
      width:"30%",
      data:row
     }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getData();
      }
    });
  }
  deleteProduct(row){
    console.log(row);
    this.apiService.deleteData(row._id).subscribe(data =>{ 
      alert('data deleted successfully!!!'); 
      this.getData();
    });
  }
}

