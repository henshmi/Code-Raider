import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscoverComponent } from 'codebases/components/discover/discover.component';
import { CodeBaseFormComponent } from 'codebases/components/codebase-form/codebase-form.component';
import { CodebaseViewComponent } from 'codebases/components/codebase-view/codebase-view.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from 'admin/services/admin-auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { TagInputModule } from 'ngx-chips';


const codebasesRoutes = [
  {
    path: 'codebases/new',
    component: CodeBaseFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'codebases/view/:_id',
    component: CodebaseViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'codebases/edit/:_id',
    component: CodeBaseFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  { path: 'codebases', component: DiscoverComponent }
];

@NgModule({
  imports: [
    SharedModule,
    TagInputModule,
    RouterModule.forChild(
      codebasesRoutes
    )
  ],
  declarations: [
    DiscoverComponent,
    CodeBaseFormComponent,
    CodebaseViewComponent
  ],
  exports: [

  ]
})
export class CodebasesModule { }
