import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { CodeBaseModel } from 'shared/models/code-base-model.model';
import { Observable } from 'rxjs';
import { NotFoundError } from '../../core/errors/not-found-error';
import { BadRequestError } from '../../core/errors/bad-request-error';
import { UnauthorizedError } from '../../core/errors/unauthorized-error';
import { ForbiddenError } from '../../core/errors/forbidden-error';
import { AppError } from '../../core/errors/app-error';

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

  getRecommendedCodebases() {
    return this.getAll('/recommended')
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
