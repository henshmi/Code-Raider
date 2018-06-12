import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends DataService {

  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api/addresses');
  }
}
