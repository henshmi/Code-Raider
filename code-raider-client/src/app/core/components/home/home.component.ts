import { Component, OnInit } from '@angular/core';
import { CodeBaseModel } from 'shared/models/code-base-model.model';
import { CodebaseService } from 'shared/services/codebase.service';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  codebases;

  constructor(
    private auth: AuthService,
    private codebaseService: CodebaseService) {
  }

  ngOnInit() {
    if (this.auth.signedIn) {
      this.codebaseService.getRecommendedCodebases()
      .subscribe(data => {
        this.codebases = data;
      });
    } else {
      this.codebaseService.getAll()
      .subscribe(data => {
        this.codebases = data;
      });
    }
  }

}
