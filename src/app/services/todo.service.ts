import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, throwError, iif } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './models/todo.model'


@Injectable({
    providedIn: 'root'
})

export class TodoService {
  url = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/';

  constructor(
    private http: HttpClient 
  ) {}

  getTodos(): Observable<any> {
    const getUrl = this.url + 'get';
    const headers = new HttpHeaders()
      .set("X-CustomHeader", "custom header value")
      .set("X-Api-Key", "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c");

    return this.http.request(
      "GET",
      getUrl, 
      {
          responseType:"json",
          headers
      });
  }

  updateTodo(todo: Todo): Observable<any> {
    const patchUrl = this.url + 'patch/' + todo.id;
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("X-Api-Key", "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c");

    return this.http.patch(patchUrl, { "isComplete": !todo.isComplete }, { responseType: "json", headers });
  }
}
