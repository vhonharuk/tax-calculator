import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TaxCalculation } from '../models/TaxCalculation';

@Injectable({
  providedIn: 'root'
})
export class TaxCalculationService {

  private url = 'http://localhost:5241/api/TaxCalculation';

  constructor(private http: HttpClient) { }

  getCalculatedTax(salary: number): Observable<TaxCalculation> {

    var salaryParam = salary;
    var result = this.http.get(this.url, {
      params: {
        salary: salaryParam
      }})
      .pipe(map(res => res as TaxCalculation));

      return result;
  }
}
