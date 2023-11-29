import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AddAsset{

    private addAssetData = 'http://localhost:8080/insertAsset'
    private procurementDetailsUrl = 'http://localhost:8080/getProcurementDetails'; 

    constructor(private http:HttpClient) { }

    addAssetRecord(asset_data: any):Observable<String>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        };

        console.log("Reched at next level");
        
    
        return this.http.post<string>(this.addAssetData,asset_data,httpOptions);
   }




    // Method to fetch procurement details based on the ID
    getProcurementDetails(procurementId: number): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      const url = `${this.procurementDetailsUrl}/${procurementId}`;
      return this.http.get(url, httpOptions);
    }

}