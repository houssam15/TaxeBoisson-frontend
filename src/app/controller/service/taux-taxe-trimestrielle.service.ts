import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TauxTaxeTrimestrielle} from '../model/taux-taxe-trimestrielle';
import {Observable} from "rxjs";
import {CategotieDeLocal} from "../model/categotie-de-local";

@Injectable({
  providedIn: 'root'
})
export class TauxTaxeTrimestrielleService {
private _tauxTaxeTrimestrielle!: TauxTaxeTrimestrielle;
private _tauxTaxeTrimestrielles!: Array<TauxTaxeTrimestrielle>;
_url="http://localhost:8036/api/v1/TauxTaxeTrimestrielle/";
  constructor(private http: HttpClient) { }


  get tauxTaxeTrimestrielle(): TauxTaxeTrimestrielle {
    if (this._tauxTaxeTrimestrielle==null) {
      this._tauxTaxeTrimestrielle = new TauxTaxeTrimestrielle();
    }
    return this._tauxTaxeTrimestrielle;
  }

  set tauxTaxeTrimestrielle(value: TauxTaxeTrimestrielle) {
    this._tauxTaxeTrimestrielle = value;
  }
  get tauxTaxeTrimestrielles(): Array<TauxTaxeTrimestrielle> {
    if (this._tauxTaxeTrimestrielle==null) {
      this._tauxTaxeTrimestrielles = new Array<TauxTaxeTrimestrielle>();
    }
    return this._tauxTaxeTrimestrielles;
  }
  set tauxTaxeTrimestrielles(value: Array<TauxTaxeTrimestrielle>) {
    this._tauxTaxeTrimestrielles = value;
  }
  get categorieDeLocal(): CategotieDeLocal {
    if(this._tauxTaxeTrimestrielle.categorieDeLocal==null){
      this._tauxTaxeTrimestrielle.categorieDeLocal=new CategotieDeLocal();
    }
    return this.tauxTaxeTrimestrielle.categorieDeLocal;
  }

  set categorieDeLocal(value: CategotieDeLocal) {
    this.tauxTaxeTrimestrielle.categorieDeLocal = value;
  }
public save(): Observable<number>{
    return this.http.post<number>(this._url,this.tauxTaxeTrimestrielle);

}

  public findAll(): Observable<Array<TauxTaxeTrimestrielle>>{
    return this.http.get<Array<TauxTaxeTrimestrielle>>(this._url);
  }
  public findByReference(reference: string): Observable<TauxTaxeTrimestrielle>{
    return this.http.get<TauxTaxeTrimestrielle>(this._url+"findbyref/"+reference)
  }
  public editTaux(taux : TauxTaxeTrimestrielle):Observable<number>{
    return this.http.post<number>(this._url+"editTaux/",taux);
  }
  public deleteTaux(ref : string):Observable<number>{
      return this.http.delete<number>(this._url+"deletebyref/"+ref);
  }




















/*
  save(){
    this.http.post<number>(this._url,this.tauxTaxeTrimestrielle).subscribe(
      data=>{
        if(data<0){
          alert("save failed with :"+data)
        }else if (data>0){
          alert("save with success")
          this.tauxTaxeTrimestrielles.push({...this.tauxTaxeTrimestrielle});
          this.tauxTaxeTrimestrielle=new TauxTaxeTrimestrielle();
        }
      }
    )
  }
  findAll(){
    this.http.get<Array<TauxTaxeTrimestrielle>>(this._url).subscribe(
      data=>{
        console.log(data)
        this.tauxTaxeTrimestrielles=data;
      }
    )
  }


  deleteByReference(reference: string, i:number){
    this.http.delete(this._url +'deletebyref/'+ reference).subscribe(
      data=>{
        if (data>0){
          this.tauxTaxeTrimestrielles.splice(i,1);
          alert("deleted succesfully ")
        }else{
          alert("error")
        }
      }
    )
  }
*/
}
