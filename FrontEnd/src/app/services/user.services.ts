import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { Rol } from '../models/Rol';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.url + 'users';

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(`${environment.url}login`, user);
  }

  getRolById(id: number): any {
    return this.http.get(`${environment.url}roles/${id}`).pipe(
      map((respuesta: any) => {
        return respuesta;
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  validarToken() {
    const token = this.getToken();
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } else {
      return false;
    }
  }

  getUser(): any {
    return localStorage.getItem('user');
  }

  getUserById(id: number): any {
    return this.http.get(`${this.url}/${id}?_expand=role`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.url}?_expand=role`).pipe(
      map((respuesta: any) => {
        return respuesta;
      })
    );
  }

  getVaccine() {
    return this.http.get(`${environment.url}vacunas`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createUser(user: any) {
    return this.http.post(`${environment.url}register`, user);
  }

  updateUser(user: any) {
    return this.http.put(`${this.url}/${user.id}`, user);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getUsersByFilter(filter: any) {
    return this.http.get(`${this.url}?_expand=role${filter}`);
  }
}
