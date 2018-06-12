import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagsService extends DataService {

  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api/codebases/tags');
  }

  getGroupedTags() {
    return this.getAll()
    .catch(this.handleError);
  }
}
