import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminModule } from 'admin/admin.module';
import { CodebasesModule } from 'codebases/codebases.module';
import { CoreModule } from 'core/core.module';
import { AuthInterceptor } from 'shared/services/auth-interceptor.service';
import { SharedModule } from 'shared/shared.module';

import { AppComponent } from './app.component';
import { AppErrorHandler } from './core/errors/app-error-handler';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AdminModule,
    CodebasesModule,
    OrdersModule,
    CoreModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: AppErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
