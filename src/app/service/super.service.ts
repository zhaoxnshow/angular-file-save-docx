import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SuperService {

  constructor(private http: HttpClient) { }

  public get(url: string): Promise<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.get(url, options).toPromise();
  }
}
