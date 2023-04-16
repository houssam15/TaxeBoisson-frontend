import { Component, Inject, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxeTrimestrielle } from '../controller/model/taxe-trimestrielle';
import { TaxeTrimestrielleService } from '../controller/service/taxe-trimestrielle.service';
import { Redevable } from '../controller/model/redevable';
import { CategorieDeRedevable } from '../controller/model/categorie-de-redevable';
import { Local } from '../controller/model/local';
import { TauxTaxeTrimestrielle } from '../controller/model/taux-taxe-trimestrielle';
import { CategotieDeLocal } from '../controller/model/categotie-de-local';
@Component({
  selector: 'app-dialog5',
  templateUrl: './dialog5.component.html',
  styleUrls: ['./dialog5.component.scss']
})
export class Dialog5Component implements OnInit{
  constructor(private taxeService : TaxeTrimestrielleService,@Inject(MAT_DIALOG_DATA) public data: string){}
  title = 'taxe boisson trimestrielle ';

  public _taxeTrimestrielle !: TaxeTrimestrielle;
  ngOnInit(): void {
    this.findByRef();
  }
  findByRef(){
    this.taxeService.findByReference(this.data).subscribe(data =>{
      if(data==null){
        alert("taxe not found")
      }else{
        this.taxeTrimestrielle=data;
      }
    })
  }

  get taxeTrimestrielle():TaxeTrimestrielle{
    return this._taxeTrimestrielle;
  }
  set taxeTrimestrielle(value:TaxeTrimestrielle){
     this._taxeTrimestrielle=value;
  }
  get redevable():Redevable{
    return this.taxeTrimestrielle.redevable;
  }
  get categorieRedevable():CategorieDeRedevable{
    return this.redevable.categorieRedevable;
  }
  get local():Local{
    return this.taxeTrimestrielle.local;
  }
  get tauxTaxeTrimestrielle():TauxTaxeTrimestrielle{
    return this.taxeTrimestrielle.tauxTaxeTrimestrielle;
  }
  get categorieDeLocal():CategotieDeLocal{
    return this.tauxTaxeTrimestrielle.categorieDeLocal;
  }

  public convertToPDF()
  { 
  const element = document.getElementById('elt'); 
  if (element !== null) {
  
  html2canvas(element).then(canvas => {
  // Few necessary setting options
   
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var width = pdf.internal.pageSize.getWidth();;
  var height =canvas.height * width / canvas.width;
  pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
  pdf.save(this.data); // Generated PDF
  });
}
  }
}
