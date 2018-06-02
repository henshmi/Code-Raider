import { ErrorHandler } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { ToastrService } from 'ngx-toastr';

export class AppErrorHandler implements ErrorHandler {

    constructor() {
    }

    handleError(error: any): void {
    }
}
