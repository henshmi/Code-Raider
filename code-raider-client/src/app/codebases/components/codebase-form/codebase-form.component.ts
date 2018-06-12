import { Component, OnInit } from '@angular/core';
import { CodeBaseModel } from 'shared/models/code-base-model.model';
import { CodebaseService } from 'shared/services/codebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-codebase-form',
  templateUrl: './codebase-form.component.html',
  styleUrls: ['./codebase-form.component.css']
})
export class CodeBaseFormComponent implements OnInit {

  codeBase;

  constructor(
    private codebaseService: CodebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.codeBase = new CodeBaseModel();
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('_id');
    if (id) {
      this.codebaseService.getCodebase(id)
      .take(1)
      .subscribe(codebase => {
        this.codeBase = codebase[0];
      });
    }
  }

  submit() {
    if (this.codeBase._id) {
      this.codebaseService.editCodebase(this.codeBase)
      .subscribe(response => {
        this.router.navigate(['']);
      });
    } else {
      this.codebaseService.addCodebase(this.codeBase)
      .subscribe(response => {
        this.router.navigate(['']);
      });
    }

  }
}
