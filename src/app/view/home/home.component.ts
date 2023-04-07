import { Component, OnInit } from '@angular/core';
import { Chart }  from "chart.js";
import { CategorieDeRedevable } from 'src/app/controller/model/categorie-de-redevable';
import { CategotieDeLocal } from 'src/app/controller/model/categotie-de-local';
import { Local } from 'src/app/controller/model/local';
import { Quartier } from 'src/app/controller/model/quartier';
import { Redevable } from 'src/app/controller/model/redevable';
import { Rue } from 'src/app/controller/model/rue';
import { Secteur } from 'src/app/controller/model/secteur';
import { TauxTaxeTrimestrielle } from 'src/app/controller/model/taux-taxe-trimestrielle';
import { TaxeTrimestrielle } from 'src/app/controller/model/taxe-trimestrielle';
import { TaxeTrimestrielleService } from 'src/app/controller/service/taxe-trimestrielle.service';
import * as CanvasJS from 'canvasjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dates : Array<string>=[];
  values : Array<number>=[];
  chiffres : Array<number>=[];
  myChart1 : any;
  myChart2 : any;

  
  ngOnInit(): void {
     this.myChart1 = new Chart('myChart', {
      // bar line radar
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: '# Retard',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
      }
      ,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.myChart2 = new Chart("mychart2", {
      data: {
        labels: [],
        datasets: [{
          label: "# Chiffre D'affaire",
          data: [],
          backgroundColor: [
            " rgba(255, 157, 0, 0.31)"

          ],
          borderColor: [
            " rgba(255, 157, 0, 0.8)"

          ],
          borderWidth: 1
        } 
      ]
      },
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
  });
          
}
findTaxe(reference:string){
  this.taxeService.findByReference(reference).subscribe(data => {
    if(data==null){
      alert("taxe not found");
    }else{
      alert("taxe is found");
      this.taxeTrimestrielle=data;
      this.findByLocalReference();
    }
  });
 
}
findByLocalReference(){
  this.taxeService.findByLocalReference(this.local.reference).subscribe(data =>{
    if(data==null){
      alert("can't find last taxes for this local !!")
    }else{
      this.taxeTrimestrielles=data;
      console.log("data   "+data)
      for(let c of data){
          this.dates.push(c.dateActuel.toString());
          this.values.push(c.retardMonths);
          this.chiffres.push(c.chifrreAffaire);
      }
      this.myChart1.data.labels=this.dates;
      this.myChart2.data.labels=this.dates;
      console.log(this.dates)
      this.myChart1.data.datasets[0].data=this.values;
      this.myChart2.data.datasets[0].data=this.chiffres;

       this.dates=[];
       this.values=[];
       this.chiffres=[];
      this.myChart1.update();
      this.myChart2.update();
    }
  });
}
switchToChiffre(){
  this.myChart1.data.datasets.data=this.chiffres;
  this.myChart1.update();
  console.log("hhhhhhhhh")
  console.log(this.chiffres)

}
  constructor(private taxeService:TaxeTrimestrielleService) {}
 
  get taxeTrimestrielle(): TaxeTrimestrielle {
    
    return this.taxeService.taxeTrimestrielle;
  }

  set taxeTrimestrielle(value: TaxeTrimestrielle) {
    this.taxeService.taxeTrimestrielle = value;
  }

  get taxeTrimestrielles(): Array<TaxeTrimestrielle> {
    
    return this.taxeService.taxeTrimestrielles;
  }

  set taxeTrimestrielles(value: Array<TaxeTrimestrielle>) {
    this.taxeService.taxeTrimestrielles = value;
  }
  get categorieDeLocal(): CategotieDeLocal {
   
    return this.taxeService.categorieDeLocal;
  }

  
  get redevable(): Redevable{
    
    return this.taxeService.redevable;
  }
  

  get local(): Local{
    
    return this.taxeService.local;
  }
  
  get tauxTaxeTrimestrielle(): TauxTaxeTrimestrielle{
   
    return this.taxeService.tauxTaxeTrimestrielle;
  }
  get categorieDeRedevable():CategorieDeRedevable{
   
    return this.taxeService.categorieDeRedevable;
  }
  get rue():Rue{
    
    return this.taxeService.rue;
  
  }
  get quartier():Quartier{
    
    return this.taxeService.quartier;
  }
  get secteur():Secteur{
    
    return this.taxeService.secteur;
  }

}
