import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog4Component } from 'src/app/dialog4/dialog4.component';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  constructor(private dialog: MatDialog){}

  openDialog4() {
    this.dialog.open(Dialog4Component,{
     width:'90%',
     height:'97%'
     
    }).afterClosed().subscribe(val => {
     if(val==='save'){
      // this.findAll();
     }
    });
   }
}
