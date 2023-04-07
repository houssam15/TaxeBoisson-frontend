import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TauxTaxeTrimestrielleService } from './controller/service/taux-taxe-trimestrielle.service';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { Dialog2Component } from './dialog2/dialog2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  constructor(private dialog: MatDialog,private tauxTaxeService:TauxTaxeTrimestrielleService,private router: Router){}
  ngOnInit(): void {
      this.findAll();
  }
  
  findAll(){
    this.tauxTaxeService.findAll().subscribe(data => {
      this.tauxTaxeService.tauxTaxeTrimestrielles=data;
      console.log(data);
    })  }


}
