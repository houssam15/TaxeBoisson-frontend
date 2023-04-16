import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import { NotificationLocal } from '../model/notification-local';
import { Redevable } from '../model/redevable';
import { Local } from '../model/local';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationLocalService {
private _notificationLocal!: NotificationLocal;
private _notificationLocals!: Array<NotificationLocal>;
_url="http://localhost:8036/api/v1/NotificationLocal/";
  constructor(private http: HttpClient) { }

  
public save(): Observable<number>{
    return this.http.post<number>(this._url,this.notificationLocal);

}

  public findAll(): Observable<Array<NotificationLocal>>{
    return this.http.get<Array<NotificationLocal>>(this._url);
  }
  public findByReference(ref: string): Observable<NotificationLocal>{
    return this.http.get<NotificationLocal>(this._url+"findByRef/"+ref)
  }
  
  public deleteNotificationLocal(ref : string):Observable<number>{
      return this.http.delete<number>(this._url+"deleteByRef/"+ref);
  }

  get notificationLocal(): NotificationLocal {
    if (this._notificationLocal==null) {
      this._notificationLocal = new NotificationLocal();
    }
    return this._notificationLocal;
  }

  set notificationLocal(value: NotificationLocal) {
    this._notificationLocal = value;
  }
  get notificationLocals(): Array<NotificationLocal> {
    if (this._notificationLocals==null) {
      this._notificationLocals = new Array<NotificationLocal>();
    }
    return this._notificationLocals;
  }
  set notificationLocals(value: Array<NotificationLocal>) {
    this._notificationLocals = value;
  }
  
get redevable():Redevable{
    if(this._notificationLocal.redevable==null){
        this._notificationLocal.redevable=new Redevable();
    }
    return this._notificationLocal.redevable;
}

get local():Local{
    if(this._notificationLocal.local==null){
        this._notificationLocal.local=new Local();
    }
    return this._notificationLocal.local;
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
