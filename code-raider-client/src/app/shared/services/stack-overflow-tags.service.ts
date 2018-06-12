import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InterceptorSkipHeader } from './auth-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class StackOverflowTagsService {

  url = 'https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow';

  constructor(private http: HttpClient) { }

  getAll() {
    const headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    return this.http.get(this.url, { headers });
  }

}
