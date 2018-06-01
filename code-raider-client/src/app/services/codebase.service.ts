import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { CodeBaseModel } from '../models/code-base-model.model';
import { Observable } from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
import { UnauthorizedError } from '../common/unauthorized-error';
import { ForbiddenError } from '../common/forbidden-error';
import { AppError } from '../common/app-error';

@Injectable({
  providedIn: 'root'
})
export class CodebaseService extends DataService {

  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api/codebases');
  }

  getCodebase(id: string) {
    return this.get(id)
    .catch(this.handleError);
  }

  addCodebase(codebase: CodeBaseModel) {
    return this.post(codebase, '/new')
    .catch(this.handleError);
  }

  editCodebase(codebase: CodeBaseModel) {
    return this.post(codebase, '/' + codebase._id)
    .catch(this.handleError);
  }

  deleteCodebase(id: string) {
    return this.delete(id)
    .catch(this.handleError);
  }
}
