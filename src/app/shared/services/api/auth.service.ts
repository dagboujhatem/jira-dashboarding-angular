import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL= environment.baseURL
  constructor(private http: HttpClient) { }

  login(userCredential: any){
    return this.http.post(`${this.baseURL}/auth/login`, userCredential);
  }

  forgotPassword(userCredential: any){
    return this.http.post(`${this.baseURL}/forgot-password`, userCredential);
  }
  
  resetPassword(userCredential: any){
    return this.http.post(`${this.baseURL}/reset-password`, userCredential);
  }

}
