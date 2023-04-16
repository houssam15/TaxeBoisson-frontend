import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationLocalService } from 'src/app/controller/service/notification-local.service';
import { Dialog3Component } from 'src/app/dialog3/dialog3.component';

@Component({
  selector: 'app-notification-local',
  templateUrl: './notification-local.component.html',
  styleUrls: ['./notification-local.component.scss']
})
export class NotificationLocalComponent {
  displayedColumns: string[] = ['id', 'ref','redevable', 'notification', 'local','montantEsstime','dateActuelle'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(private dialog: MatDialog,private notificationLocalService:NotificationLocalService,private router: Router){}
  ngOnInit(): void {
     // this.findAll();
  }
  openDialog3() {
     this.dialog.open(Dialog3Component,{
      width:'50%',
      height:'60%'
      
     }).afterClosed().subscribe(val => {
      if(val==='save'){
       // this.findAll();
      }
     });
    }
    
    
      
 
  findAll(){
    this.notificationLocalService.findAll().subscribe(data => {
      //this.tauxTaxeService.tauxTaxeTrimestrielles=data;
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort ;
    })  }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    deleteNotification(ref:string){
      this.notificationLocalService.deleteNotificationLocal(ref).subscribe(data => {
        alert("delete Succesfully")
        this.findAll();
      })
    }  
    
}

