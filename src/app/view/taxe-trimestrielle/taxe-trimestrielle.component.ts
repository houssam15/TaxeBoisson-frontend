import { Component ,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { TaxeTrimestrielle } from 'src/app/controller/model/taxe-trimestrielle';
import { TaxeTrimestrielleService } from 'src/app/controller/service/taxe-trimestrielle.service';
import { Dialog2Component } from 'src/app/dialog2/dialog2.component';
import { Dialog5Component } from 'src/app/dialog5/dialog5.component';
@Component({
  selector: 'app-taxe-trimestrielle',
  templateUrl: './taxe-trimestrielle.component.html',
  styleUrls: ['./taxe-trimestrielle.component.scss']
})
export class TaxeTrimestrielleComponent implements OnInit {
  //displayedColumns: string[] = ['id', 'reference', 'redevable', 'local','categorie','tauxTrimestrielle','chifrreAffaire','retardMonths','montantBase','montantTotal','PremierMoisRetard','AutreMoisRetard','dateDePayement','action'];
  displayedColumns: string[] = [ 'reference', 'redevable', 'local','chifrreAffaire','retardMonths','montantBase','montantTotal','dateDePayement','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private taxeService:TaxeTrimestrielleService,private router: Router){}
  ngOnInit(): void {
    this.findAll();
}
findAll(){
  this.taxeService.findAll().subscribe(data => {
    //this.tauxTaxeService.tauxTaxeTrimestrielles=data;
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort ;
  })  }

  openDialog2() {
    this.dialog.open(Dialog2Component,{
      width:'50%',
      height:'88%'
    }).afterClosed().subscribe(val => {
      if(val==='save'){
        this.findAll();
      }
    });
  }
  openDialog5(reference: string){
    
    this.dialog.open(Dialog5Component,{
      width:'60%',
      height:'90%',
      data:reference
    }).afterClosed().subscribe(val => {
      if(val==='save'){
        this.findAll();
      }
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editTaxe(row: TaxeTrimestrielle){
    this.dialog.open(Dialog2Component,{
      width:'50%',
      height:'88%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val==='update'){
        this.findAll();
      }
     });
}
deleteTaxe(reference:string){
  this.taxeService.deleteTaxe(reference).subscribe(data => {
    alert("delete Succesfully")
    this.findAll();
  })
}  }
