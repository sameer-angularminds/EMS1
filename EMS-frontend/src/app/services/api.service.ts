import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  apiUrl='http://localhost:3000/employees/'

  postData(data:any){
    return this.http.post(this.apiUrl,data);
  }

  getData(){
    return this.http.get(this.apiUrl);
  }


  updateData(data:any,id:number){
    return this.http.put(this.apiUrl + id,data);
  }
  deleteData(id:number){
    return this.http.delete(this.apiUrl + id);
  }
}
