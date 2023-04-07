import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TauxTaxeTrimestrielleService } from 'src/app/controller/service/taux-taxe-trimestrielle.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TauxTaxeTrimestrielle } from 'src/app/controller/model/taux-taxe-trimestrielle';
import { Dialog } from '@angular/cdk/dialog';
@Component({
  selector: 'app-taux-taxe-treimestrielle',
  templateUrl: './taux-taxe-treimestrielle.component.html',
  styleUrls: ['./taux-taxe-treimestrielle.component.scss']
})
export class TauxTaxeTreimestrielleComponent {
  displayedColumns: string[] = ['id', 'ref','categorieDeLocal', 'dateAppMin', 'dateAppMax','pourcentage','pourcentageRetardPremierMois','pourcentageRetardAutreMois','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(private dialog: MatDialog,private tauxTaxeService:TauxTaxeTrimestrielleService,private router: Router){}
  ngOnInit(): void {
      this.findAll();
  }
  openDialog1() {
     this.dialog.open(DialogComponent,{
      width:'50%',
      height:'88%'
      
     }).afterClosed().subscribe(val => {
      if(val==='save'){
        this.findAll();
      }
     });
    }
    
    
      
 
  findAll(){
    this.tauxTaxeService.findAll().subscribe(data => {
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

    deleteTaux(ref:string){
      this.tauxTaxeService.deleteTaux(ref).subscribe(data => {
        alert("delete Succesfully")
        this.findAll();
      })
    }  
    editTaux(row: any){
        this.dialog.open(DialogComponent,{
          width:'50%',
          height:'88%',
          data:row
        }).afterClosed().subscribe(val => {
          if(val==='update'){
            this.findAll();
          }
         });
    }
}
