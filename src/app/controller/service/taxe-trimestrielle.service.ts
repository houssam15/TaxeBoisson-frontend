import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategotieDeLocal } from '../model/categotie-de-local';
import { Local } from '../model/local';
import { Redevable } from '../model/redevable';
import { TauxTaxeTrimestrielle } from '../model/taux-taxe-trimestrielle';
import { TaxeTrimestrielle } from '../model/taxe-trimestrielle';
import { CategorieDeRedevable } from '../model/categorie-de-redevable';
import { Rue } from '../model/rue';
import { Quartier } from '../model/quartier';
import { Secteur } from '../model/secteur';

@Injectable({
  providedIn: 'root'
})
export class TaxeTrimestrielleService {

  private _taxeTrimestrielle!: TaxeTrimestrielle;
  private _taxeTrimestrielles!:Array<TaxeTrimestrielle>;
  url="http://localhost:8036/api/v1/taxetrimestrielle/";
  ingore:boolean=false;
  constructor(private http: HttpClient) {
  }

public save():Observable<number>{
    return this.http.post<number>(this.url+"ingore/"+this.ingore.toString(),this.taxeTrimestrielle);
  }
public findAll():Observable<Array<TaxeTrimestrielle>>{
    return this.http.get<Array<TaxeTrimestrielle>>(this.url);
  }
public editTaxe(taxe : TaxeTrimestrielle):Observable<number>{
    return this.http.post<number>(this.url+"editTaxe/",taxe);
  }

public deleteTaxe(ref : string):Observable<number>{
  return this.http.delete<number>(this.url+"deletebyreference/"+ref);
 }
 public findByReference(ref : string):Observable<TaxeTrimestrielle>{
  return this.http.get<TaxeTrimestrielle>(this.url+"findbyreference/"+ref);
 }
 public findByLocalReference(ref:string):Observable<Array<TaxeTrimestrielle>>{
  return this.http.get<Array<TaxeTrimestrielle>>(this.url+"findByLocalReference/"+ref);
 }

  get taxeTrimestrielle(): TaxeTrimestrielle {
    if(this._taxeTrimestrielle==null) {
      this._taxeTrimestrielle = new TaxeTrimestrielle();
    }
    return this._taxeTrimestrielle;
  }

  set taxeTrimestrielle(value: TaxeTrimestrielle) {
    this._taxeTrimestrielle = value;
  }

  get taxeTrimestrielles(): Array<TaxeTrimestrielle> {
    if(this._taxeTrimestrielles==null) {
      this._taxeTrimestrielles = new Array<TaxeTrimestrielle>();
    }
    return this._taxeTrimestrielles;
  }

  set taxeTrimestrielles(value: Array<TaxeTrimestrielle>) {
    this._taxeTrimestrielles = value;
  }
  get categorieDeLocal(): CategotieDeLocal {
    if(this._taxeTrimestrielle.categorieDeLocal==null){
      this._taxeTrimestrielle.categorieDeLocal=new CategotieDeLocal();
    }
    return this.taxeTrimestrielle.categorieDeLocal;
  }

  set categorieDeLocal(value: CategotieDeLocal) {
    this.taxeTrimestrielle.categorieDeLocal = value;
  }
  get redevable(): Redevable{
    if (this._taxeTrimestrielle.redevable==null) {
        this._taxeTrimestrielle.redevable= new Redevable();
    }
    return this.taxeTrimestrielle.redevable;
  }
  set redevable(value: Redevable){
    this.taxeTrimestrielle.redevable=value;
  }

  get local(): Local{
    if (this._taxeTrimestrielle.local==null) {
      this._taxeTrimestrielle.local= new Local();
    }
    return this.taxeTrimestrielle.local;
  }
  set local(value: Local){
    this.taxeTrimestrielle.local=value;
  }
  get tauxTaxeTrimestrielle(): TauxTaxeTrimestrielle{
    if (this._taxeTrimestrielle.tauxTaxeTrimestrielle==null) {
      this._taxeTrimestrielle.tauxTaxeTrimestrielle= new TauxTaxeTrimestrielle();
    }
    return this.taxeTrimestrielle.tauxTaxeTrimestrielle;
  }
  set tauxTaxeTrimestrielle(value: TauxTaxeTrimestrielle){
    this.taxeTrimestrielle.tauxTaxeTrimestrielle=value;
  }
  get categorieDeRedevable():CategorieDeRedevable{
    if(this.taxeTrimestrielle.redevable.categorieRedevable==null){
      this.taxeTrimestrielle.redevable.categorieRedevable=new CategorieDeRedevable();
    }
    return this.taxeTrimestrielle.redevable.categorieRedevable;
  }

  get rue():Rue{
    if(this.taxeTrimestrielle.local.rue==null){
      this.taxeTrimestrielle.local.rue=new Rue();
    }
    return this.taxeTrimestrielle.local.rue;
  
  }
  get quartier():Quartier{
    if(this.taxeTrimestrielle.local.rue.quartier==null){
      this.taxeTrimestrielle.local.rue.quartier=new Quartier();
    }
    return this.taxeTrimestrielle.local.rue.quartier;
  }
  get secteur():Secteur{
    if(this.taxeTrimestrielle.local.rue.quartier.secteur==null){
      this.taxeTrimestrielle.local.rue.quartier.secteur=new Secteur();
    }
    return this.taxeTrimestrielle.local.rue.quartier.secteur;
  }

}
