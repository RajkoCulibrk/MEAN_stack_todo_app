import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoProviderService {
  url: string = 'http://localhost:5000/api/todos';
  headers: HttpHeaders;
  todos: { _id: string }[];
  constructor(private http: HttpClient) {}

  setHeaders() {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token')) {
      headers = headers.set('x-auth-token', localStorage.getItem('token'));
    }
    this.headers = headers;
  }

  getTodos() {
    this.setHeaders();
    return this.http
      .get(this.url, { headers: this.headers })
      .pipe(
        map((x) => {
          return x;
        })
      )
      .subscribe(
        (r: []) => {
          console.log(r);
          this.todos = r;
        },
        (e) => {
          console.log(e);
        }
      );
  }

  deleteTodo(id) {
    this.setHeaders();
    return this.http
      .delete(this.url + '/' + id, { headers: this.headers })
      .subscribe(
        (r) => {
          let index = this.todos.findIndex((t) => t._id == id);
          this.todos.splice(index, 1);
        },
        (e) => {
          console.log(e);
        }
      );
  }

  updateTodo(id, data) {
    this.setHeaders();
    this.http
      .put(this.url + '/' + id, data, { headers: this.headers })
      .subscribe(
        (r: any) => {
          let index = this.todos.findIndex((t) => t._id == id);

          this.todos.splice(index, 1, r);
        },
        (e) => {
          console.log(e);
        }
      );
  }

  addTodo(data) {
    this.setHeaders();
    return this.http
      .post(this.url, data, { headers: this.headers })
      .pipe(
        map((x: any) => {
          return x;
        })
      )
      .subscribe(
        (r) => {
          this.todos.unshift(r);
        },
        (e) => {
          console.log(e);
        }
      );
  }
}
