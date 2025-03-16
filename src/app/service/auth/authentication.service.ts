import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { PlayerHumanDTO } from 'src/app/model/game-entity-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    return this.http
      .post<PlayerHumanDTO>(`${this.baseUrl}/login`, body, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          console.log('Login successful:', response);
          const body = response;
          localStorage.setItem('currentUser', JSON.stringify(body));
          this.currentUserSubject.next(body);
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }
  logout(): Observable<Object> {
    return this.http.post(`${this.baseUrl}/logout`, {}, {'withCredentials':true}).pipe(
      tap((response) => {
        console.log('Logout successful:', response);
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      }),
      catchError((error) => {
        console.error('Logout error: ', error);
        return throwError(() => error);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }
}
