import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  login(username: string, password: string): Observable<{ user: User, key: string } | null> {
    return this.http.get<any>(`${this.API_USUARIOS}.json`).pipe(
      map((users: { [key: string]: User }) => {
        const keys = Object.keys(users);
        for (const key of keys) {
          const user = users[key];
          if (user.nombreUsuario === username && user.clave === password) {
            // Store user information and key in sessionStorage
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('userKey', key);
            
            return { user, key };
          }
        }
        return null;
      })
    );
  }

  logout(): void {
    // Remove user information and key from sessionStorage on logout
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userKey');
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
  getnombre(): string | null {
    // Get user information from sessionStorage and extract name
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      return user.nombreUsuario;
    } else {
      return null;
    }
  }
  getUserKey(): string | null {
    // Get user key from sessionStorage
    return sessionStorage.getItem('userKey');
  }
  
}