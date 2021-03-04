import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/User';
@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  url: string = 'http://localhost:5000/api/';
  user: User = null;
  token: string = null;
  errors: Object[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  register(credentials) {
    return this.http
      .post<{ [token: string]: string }>(this.url + 'users', credentials)
      .pipe(
        map((x) => {
          console.log(x);
          return x;
        })
      )
      .subscribe(
        (r) => {
          localStorage.setItem('token', r.token);
          this.getUser();
        },
        (e) => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.user = null;

          if (e.error && !e.error.msg) {
            this.setError(e.error);
          }
          if (e.error.errors) {
            this.setError(e.error.errors[0].msg);
          }
          if (e.error.msg) {
            this.setError(e.error.msg);
          }
        }
      );
  }

  login(credentials) {
    return this.http
      .post<{ [token: string]: string }>(this.url + 'auth', credentials)
      .pipe(
        map((x) => {
          console.log(x);
          return x;
        })
      )
      .subscribe(
        (r) => {
          localStorage.setItem('token', r.token);
          this.token = r.token;
          console.log(r);
          this.getUser();
        },
        (e) => {
          this.user = null;
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          if (e.error.errors) {
            this.setError(e.error.errors[0].msg);
          }
          if (e.error.msg) {
            this.setError(e.error.msg);
          }
        }
      );
  }

  setError(message) {
    let error = {
      id: Date.now(),
      msg: message,
    };
    this.errors.push(error);
    let t = setTimeout(() => {
      this.errors.length = 0;
      clearTimeout(t);
    }, 3000);
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getUser() {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token')) {
      headers = headers.set('x-auth-token', localStorage.getItem('token'));
    }
    return this.http
      .get(this.url + 'auth', { headers })
      .pipe(
        map((x: User) => {
          return x;
        })
      )
      .subscribe(
        (r) => {
          this.user = r;
          localStorage.setItem('user', JSON.stringify(r));
          this.router.navigateByUrl('home');
        },
        (e) => {
          this.user = null;
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.router.navigateByUrl('signin');
          console.log(e.message.error, 'hello');
        }
      );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.token = null;
    this.user = null;
    this.router.navigateByUrl('signin');
  }
}
