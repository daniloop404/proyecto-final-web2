import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface User {
  nombreUsuario: string;
  clave: string;
  rol: string;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_USUARIOS = "https://app-web-2-d5607-default-rtdb.firebaseio.com/usuarios";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any>(`${this.API_USUARIOS}.json`).pipe(
      map((users: { [key: string]: User }) => {
        const user = Object.values(users).find(u => u.nombreUsuario === username && u.clave === password);

        if (user) {
          // Store user information in sessionStorage
          sessionStorage.setItem('user', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    // Remove user information from sessionStorage on logout
    sessionStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    // Check if user information is present in sessionStorage
    return sessionStorage.getItem('user') !== null;
  }

  getRole(): string | null {
    // Get user information from sessionStorage and extract role
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      return user.rol;
    } else {
      return null;
    }
  }
}