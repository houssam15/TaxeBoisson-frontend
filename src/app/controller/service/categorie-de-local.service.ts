import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategotieDeLocal } from '../model/categotie-de-local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieDeLocalService {
  _url="http://localhost:8036/api/v1/categoriedelocal/";

  constructor(private http: HttpClient) { }
  public findAll():Observable<Array<CategotieDeLocal>>{
    return this.http.get<Array<CategotieDeLocal>>(this._url);
  }
}
