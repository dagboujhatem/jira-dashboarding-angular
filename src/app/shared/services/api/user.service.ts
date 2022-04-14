import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL= environment.baseURL
  constructor(private http: HttpClient) { }

  addUser(userData: any){
    return this.http.post(`${this.baseURL}/users/`, userData);
  }
}
